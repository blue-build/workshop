import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const githubToken = event.cookies.get("github_oauth_token") ?? null;
    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${githubToken}`
        }
    });
    if (githubUserResponse.ok) {
        const githubUser = await githubUserResponse.json();
        event.locals.githubUser = githubUser;
    } else {
        event.locals.githubUser = null;
    }

    return resolve(event);
};
