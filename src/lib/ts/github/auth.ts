import { GitHub } from "arctic";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";

export const githubAuth = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
