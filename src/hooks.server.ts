import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const githubToken = event.cookies.get("github_oauth_token") ?? null;
    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${githubToken}`
        }
    });
    event.locals.githubUser = githubUserResponse.ok ? await githubUserResponse.json() : "hi";

    event.locals.hello = "world";

    return await resolve(event);
};
