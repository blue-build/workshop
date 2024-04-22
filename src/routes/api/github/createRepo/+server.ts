import { ghApiGet, ghApiPost, ghApiPut } from "$lib/ts/github/api";
import { createLogStream } from "$lib/ts/misc/logStream";
import type { Endpoints } from "@octokit/types";

export async function POST({ request, cookies, platform }): Promise<Response> {
    let done = false;
    // async function waitForDone() {
    //     while (!done) {
    //         await new Promise((r) => setTimeout(r, 100));
    //     }
    //     return null;
    // }
    // platform?.context.waitUntil(waitForDone());

    return await createLogStream(async (log) => {
        const token = cookies.get("github_oauth_token");
        if (token === undefined) throw new Error("Not logged in");
        const { login, name } = await request.json();

        // Create repository
        log("Creating repo: " + login + "/" + name);
        const repo = await ghApiPost(token, "/repos/blue-build/template/generate", {
            owner: login,
            name: name
        });
        if (!repo.ok) {
            log("Repo creation failed: " + JSON.stringify(repo));
        } else {
            log("Repo created successfully!");
        }
        const repoData =
            repo.data as Endpoints["POST /repos/{template_owner}/{template_repo}/generate"]["response"]["data"];

        // hacky fix for issues caused by repository being empty right after generation
        log("Taking a short break to make sure the repo gets fully generated...");
        await new Promise((r) => setTimeout(r, 2000));

        // Edit README.md
        log("Fetching template README.md...");
        const readme = await ghApiGet(token, `/repos/${repoData.full_name}/contents/README.md`);
        if (!readme.ok) {
            log("Fetching README failed: " + JSON.stringify(readme));
        } else {
            log("Fetched README successfully!");
        }
        const readmeData =
            readme.data as Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];
        let readmeStr = String(atob(readmeData.content));
        readmeStr = readmeStr.replaceAll("blue-build/template", repoData.full_name?.toLowerCase());
        readmeStr = readmeStr.replaceAll("# BlueBuild Template", "# " + name);
        const readmeUpdate = await ghApiPut(
            token,
            `/repos/${repoData.full_name}/contents/README.md`,
            {
                message: "chore(automatic): replace all reference to template in README",
                content: btoa(readmeStr),
                sha: readmeData.sha
            }
        );
        if (!readmeUpdate.ok) {
            log("Updating README failed: " + JSON.stringify(readmeUpdate));
        } else {
            log("Updated README successfully!");
        }

        // Edit recipe.yml
        log("Fetching template recipe.yml...");
        const recipe = await ghApiGet(
            token,
            `/repos/${repoData.full_name}/contents/config/recipe.yml`
        );
        if (!recipe.ok) {
            log("Fetching recipe failed: " + JSON.stringify(recipe));
        } else {
            log("Fetched recipe successfully!");
        }
        const recipeData =
            recipe.data as Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];
        let recipeStr = String(atob(recipeData.content));
        recipeStr = recipeStr.replaceAll("name: template", `name: ${name}`);
        // update
        const recipeUpdate = await ghApiPut(
            token,
            `/repos/${repoData.full_name}/contents/config/recipe.yml`,
            {
                message: "chore(automatic): change image name in recipe",
                content: btoa(recipeStr),
                sha: recipeData.sha
            }
        );
        if (!recipeUpdate.ok) {
            log("Updating recipe failed: " + JSON.stringify(recipeUpdate));
        } else {
            log("Updated recipe successfully!");
        }

        // This code just hangs. I think the actions are enabled by default.
        // log("Enabling GitHub Actions...");
        // const enableActions = await ghApiPut(
        //     token,
        //     `/repos/${repoData.full_name}/actions/permissions`,
        //     {
        //         enabled: true
        //     }
        // );
        // if (!enableActions.ok) {
        //     log("Enabling GitHub Actions failed: " + JSON.stringify(enableActions));
        // } else {
        //     log("Enabled GitHub Actions successfully!");
        // }
        // const enableBuildYml = await ghApiPut(
        //     token,
        //     `/repos/${repoData.full_name}/actions/workflows/build.yml/enable`,
        //     {}
        // );
        // if (!enableBuildYml.ok) {
        //     log("Enabling build.yml workflow failed: " + JSON.stringify(enableBuildYml));
        // } else {
        //     log("Enabled build.yml workflow successfully!");
        // }

        log("Initial repository setup DONE!");
        done = true;
    });
}
