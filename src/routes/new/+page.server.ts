import { redirect } from "@sveltejs/kit";
export function load({ locals }) {
    if (locals.githubUser === null) {
        redirect(303, "/");
    }
}
