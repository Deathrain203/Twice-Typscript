import { json, redirect } from "@sveltejs/kit";
import { User } from "$lib/server/auth";
export const GET = async (event: any) => {
  const session = event.locals.session;
  if (!session) {
    redirect(302, "/signin");
  }

  try {
    const updateUser: any = await User.updateMany({dev: true})
    const currentUser = await User.findById(session.userId)

console.log(currentUser)
    return json("Hello World")
  } catch (error) {
    console.log(error);
  }
};
