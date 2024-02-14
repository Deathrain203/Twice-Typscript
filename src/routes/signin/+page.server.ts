import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { User } from "$lib/server/auth";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";

export const load: PageServerLoad = async (event) => {
  const session = event.locals.session;
  if (session) {
    redirect(302, "/");
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData: any = await event.request.formData();
    const username: String = formData.get("username").toLowerCase();
    const password: string = formData.get("password");
    const findUser = await User.find({ username: username });

    if (!findUser[0]) {
     return {
        message: "Invalid username or password"
     }
    }

    if (findUser[0]) {
      const currentUser = findUser[0];
      const validPassword: boolean = await new Argon2id().verify(
        currentUser.password,
        password
      );
      if (validPassword) {
        const session = await lucia.createSession(currentUser._id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
          path: ".",
          ...sessionCookie.attributes,
        });
        redirect(302, "/");

      }
      else{
        return {
            message: "Invalid username or password"
        }
      }
    }
  },
};
