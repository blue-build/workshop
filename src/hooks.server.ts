import { ghApiGet } from "$lib/ts/github/api";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const githubToken = event.cookies.get("github_oauth_token") ?? null;
    if (githubToken !== null) {
        const githubUserResponse = await ghApiGet(githubToken, "/user");
        event.locals.githubUser = githubUserResponse.ok ? githubUserResponse.data : null;
    }

    return await resolve(event);
};
