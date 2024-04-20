export async function load({ locals, parent }) {
    await parent();
    return {
        githubUser: locals.githubUser,
        hello: locals.world
    };
}
