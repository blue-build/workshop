// routes/login/github/+server.ts
import { redirect } from "@sveltejs/kit";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    await event.cookies.delete("github_oauth_state", { path: "/" });
    await event.cookies.delete("github_oauth_token", { path: "/" });

    redirect(302, "/");
}
