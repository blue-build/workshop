// routes/login/github/+server.ts
import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { githubAuth } from "$lib/ts/github/auth";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
    const state = generateState();
    const url = await githubAuth.createAuthorizationURL(state, {
        scopes: ["repo"]
    });

    event.cookies.set("github_oauth_state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    redirect(302, url.toString());
}
