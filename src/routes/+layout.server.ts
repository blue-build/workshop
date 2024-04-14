// import { githubAuth } from "$lib/ts/github/auth";
import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
    const token = event.cookies.get("github_oauth_token") ?? null;

    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const githubUser = await githubUserResponse.json();
    return {
        githubUser
    };
}
