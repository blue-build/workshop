export async function load({ locals, cookies }) {
    const githubToken = cookies.get("github_oauth_token") ?? null;
    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${githubToken}`,
            "User-Agent": "BlueBuild Workshop"
        }
    });

    return {
        githubUser: githubUserResponse.ok ? await githubUserResponse.json() : null,
        status: githubUserResponse.statusText + " " + githubUserResponse.status
    };
}
