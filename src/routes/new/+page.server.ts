import { redirect } from "@sveltejs/kit";
export async function load({ locals }) {
    if (locals.githubUser === null) {
        redirect(303, "/");
    }
}
