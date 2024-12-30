import { redirect } from "@sveltejs/kit";
import { ghApiGet } from "$lib/ts/github/api.js";
import type { Endpoints } from "@octokit/types";

export async function load({ locals, cookies, params }) {
    if (locals.githubUser === undefined) {
        redirect(303, "/");
    } else {
        const token = cookies.get("github_oauth_token");
        const repos = await ghApiGet(token, `/repos/${params.user}/${params.repo}`);
        if (!repos.ok) return {};

        const repoData = repos.data as Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

        return {
            repoData
        };
    }
}
