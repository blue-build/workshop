// routes/login/github/callback/+server.ts
import { OAuth2RequestError } from "arctic";
import { githubAuth } from "$lib/ts/github/auth";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("github_oauth_state") ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await githubAuth.validateAuthorizationCode(code);
        event.cookies.set("github_oauth_token", tokens.accessToken, {
            path: "/",
            secure: import.meta.env.PROD,
            httpOnly: true,
            maxAge: 60 * 10,
            sameSite: "lax"
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}
