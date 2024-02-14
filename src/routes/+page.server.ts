import type { Actions, PageServerLoad } from "./$types";

export const load : PageServerLoad = async (event) =>{
    const session : any = event.locals.session
    
}