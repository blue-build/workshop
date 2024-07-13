import { ghApiGet } from "$lib/ts/github/api.js";
import type { Endpoints } from "@octokit/types";

export async function load({ locals, cookies }) {
    if (locals.githubUser !== undefined) {
        const token = cookies.get("github_oauth_token");
        const repos = await ghApiGet(token, `/users/${locals.githubUser.login}/repos`);
        if (!repos.ok) return {};

        const repoData = repos.data as Endpoints["GET /users/{username}/repos"]["response"]["data"];
        const bluebuildRepos = repoData.filter((repo) => repo.topics?.includes("bluebuild-image"));

        return {
            bluebuildRepos
        };
    }
}
