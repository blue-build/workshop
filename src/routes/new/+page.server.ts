import { redirect } from "@sveltejs/kit";
export async function load({ locals }) {
    if (locals.githubUser === undefined) {
        redirect(303, "/");
    }
}
