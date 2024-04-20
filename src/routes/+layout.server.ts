export async function load({ locals }) {
    return {
        githubUser: locals.githubUser,
        hello: locals.hello
    };
}
