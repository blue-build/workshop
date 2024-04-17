import { redirect } from "@sveltejs/kit";
export function load({ locals }) {
    console.log(locals);
    if (locals.githubUser === null) {
        redirect(303, "/");
    }
}
