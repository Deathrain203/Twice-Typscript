
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { Member } from "$lib/server/auth";

export const load : PageServerLoad= async (event) =>{
    const session = event.locals.session
    const memberList = await Member.find();

    return {
        memberList : JSON.parse(JSON.stringify(memberList))
    }

}