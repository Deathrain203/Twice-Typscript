import { lucia } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";
import { generateId } from "lucia";
import mongoose from "mongoose";
import { User } from "$lib/server/auth";
import { Argon2id } from "oslo/password";
import { error, fail, redirect } from "@sveltejs/kit";


export const load  :PageServerLoad= (event) =>{
const session = event.locals.session
if(session){
    redirect(302, '/')
}

}
export const actions : Actions = {
    
    signup: async (event) =>{

        let formData : any = await event.request.formData();

        let password : string = formData.get("password")
        let username: String = formData.get("username").toLowerCase();
        let hashedPassword : String = await new Argon2id().hash(password)
        let userId = generateId(15)

        const userCheck = await User.find({username: username})
        
    if(username.includes(" ") || password.includes(" ")){
        return {
            message: "Username and password can't contain spaces"
        }
    }
        if(!userCheck[0]){
            const newUser = await User.create({
                username: username,
                password: hashedPassword,
                _id:  userId,
    
                
            })
    
            const session = await lucia.createSession(userId, {})
            const sessionCookie = lucia.createSessionCookie(session.id);
            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });

        }
        else{
            return {
                message: "Username Exists"
            }
        }
        
    },

    signout: async (event) =>{
        const session = event.locals.session
        if(!session){
            return {
                error: "Already signed out"
            }
        }

        await lucia.invalidateSession(session.id)
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value,{
            path: ".",
            ...sessionCookie.attributes
        })
        redirect(302, '/')
    }
}