export async function load({ locals, cookies }) {
    return {
        githubUser: locals.githubUser,
        cookies: JSON.stringify(cookies)
    };
}
