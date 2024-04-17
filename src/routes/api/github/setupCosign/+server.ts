import { ghApiGet, ghApiPost, ghApiPut } from "$lib/ts/github/api";
import { createLogStream } from "$lib/ts/misc/logStream";
import type { Endpoints } from "@octokit/types";
import _sodium from "libsodium-wrappers";

export async function POST({ request, cookies }): Promise<Response> {
    return await createLogStream(async (log) => {
        const token = cookies.get("github_oauth_token");
        if (token === undefined) throw new Error("Not logged in");
        const { login, name, cosignPrivateKey, cosignPublicKey } = await request.json();

        // Private key
        log("Setting up sodium for encrypting private key for transit...");
        await _sodium.ready;
        const sodium = _sodium;

        log("Fetching repository public key to encrypt private key for transit...");
        const pubKey = await ghApiGet(token, `/repos/${login}/${name}/actions/secrets/public-key`);
        if (!pubKey.ok) {
            log("Fetching public key failed: " + JSON.stringify(pubKey));
        } else {
            log("Fetched public key successfully!");
        }
        const pubKeyData =
            pubKey.data as Endpoints["GET /repos/{owner}/{repo}/actions/secrets/public-key"]["response"]["data"];

        log("Encrypting private key for transit...");
        const binRepoPubKey = sodium.from_base64(pubKeyData.key, sodium.base64_variants.ORIGINAL);
        const binPrivateKey = sodium.from_string(cosignPrivateKey);
        const encBytes = sodium.crypto_box_seal(binPrivateKey, binRepoPubKey);
        const encPrivateKey = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);
        log("Private signing key encrypted successfully!");

        log("Setting SIGNING_SECRET secret...");
        const signingSecret = await ghApiPut(
            token,
            `/repos/${login}/${name}/actions/secrets/SIGNING_SECRET`,
            {
                encrypted_value: encPrivateKey,
                key_id: pubKeyData.key_id
            }
        );
        if (!signingSecret.ok) {
            log("Setting signing secret failed: " + JSON.stringify(signingSecret));
        } else {
            log("Set signing secret successfully!");
        }

        // Public key
        log("Fetching template cosign.pub...");
        const oldPubKey = await ghApiGet(token, `/repos/${login}/${name}/contents/cosign.pub`);
        if (!oldPubKey.ok) {
            log("Fetching old public key failed: " + JSON.stringify(oldPubKey));
        } else {
            log("Fetched old public key successfully!");
        }
        const oldPubKeyData =
            oldPubKey.data as Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

        log("Updating cosign.pub...");
        const pubKeyUpdate = await ghApiPut(token, `/repos/${login}/${name}/contents/cosign.pub`, {
            message: "chore(automatic): new cosign keys",
            content: btoa(cosignPublicKey),
            sha: oldPubKeyData.sha
        });
        if (!pubKeyUpdate.ok) {
            log("Updating public key failed: " + JSON.stringify(pubKeyUpdate));
        } else {
            log("Updated public key successfully!");
        }

        log("Cosign setup DONE!");
    });
}
