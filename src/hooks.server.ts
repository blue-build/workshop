import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const githubToken = event.cookies.get("github_oauth_token") ?? null;
    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${githubToken}`
        }
    });
    const githubUser = await githubUserResponse.json();
    if (githubUserResponse.ok) {
        event.locals.githubUser = githubUser;
    } else {
        event.locals.githubUser = null;
    }

    event.locals.hello = "world";

    return await resolve(event);
};
