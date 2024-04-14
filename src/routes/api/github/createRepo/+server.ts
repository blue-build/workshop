import { createLogStream } from "$lib/ts/misc/logStream.js";

export async function POST({ request, cookies }): Promise<Response> {
    return await createLogStream(async (logStream) => {
        const token = cookies.get("github_oauth_token");
        const { login, name } = await request.json();

        logStream.enqueue("Creating repo: " + login + "/" + name);
        const res = await fetch(`https://api.github.com/repos/blue-build/template/generate`, {
            method: "post",
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                owner: login,
                name: name
            })
        });
        const repo = await res.json();
        if (!res.ok) {
            logStream.enqueue("Repo creation failed: " + JSON.stringify(repo));
        } else {
            logStream.enqueue("Repo created successfully!");
        }
    });
}
