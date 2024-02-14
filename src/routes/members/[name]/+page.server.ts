import { Member, User } from "$lib/server/auth";
import type { PageServerLoad, Actions } from "./$types";
import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const session = event.locals.session;
  let user = null;

  try {
    const currentMember = await Member.findById(event.params.name);

    if (session) {
      const currentUser = await User.findById(session?.userId);
      user = currentUser;
    }

    return {
      member: JSON.parse(JSON.stringify(currentMember)),
      user_admin: user?.dev,
      params: event.params.name,
    };
  } catch (e) {
    error(404, "Missing Page");
  }
};

export const actions: Actions = {
  delete: async (event) => {
    const session = event.locals.session;
    if (!session) {
      redirect(302, "/signin");
    }
    const currentUser = await User.findById(session.userId);
    if (!currentUser?.dev) {
      redirect(302, "/");
    }

    try {
      const deletePage = await Member.findByIdAndDelete(event.params.name);
    } catch (error) {
      console.log(error);
    }
  },
  first: async (event) => {
    const session = event.locals.session;
    if (!session) {
      redirect(302, "/signin");
    }
    const currentMember: any = await Member.findById(event.params.name);
    const currentUser: any = await User.findById(session.userId);
    currentUser.firstStan === currentMember.name;
    currentUser.firstStan = currentMember.name;
    if (currentUser.secondStan === currentMember.name) {
      currentUser.secondStan ="None";
      await currentUser.save();
    }
    if (currentUser.thirdStan === currentMember.name) {
      currentUser.thirdStan = "None";
      await currentUser.save();
    }

    await currentUser.save();
  },
  second: async (event) => {
    const session = event.locals.session;
    if (!session) {
      redirect(302, "/signin");
    }
    const currentMember: any = await Member.findById(event.params.name);
    const currentUser: any = await User.findById(session.userId);

    if (currentUser.firstStan === currentMember.name) {
      currentUser.firstStan = "None";
      await currentUser.save();
    }
    if (currentUser.thirdStan === currentMember.name) {
      currentUser.thirdStan = "None";

    }
    currentUser.secondStan = currentMember.name;
    const update = await currentUser.save();
    
   
  },
  third: async (event) => {
    const session = event.locals.session;
    if (!session) {
      redirect(302, "/signin");
    }
    const currentMember: any = await Member.findById(event.params.name);
    const currentUser: any = await User.findById(session.userId);

    if (currentUser.secondStan === currentMember.name) {
      currentUser.secondStan = "None";
      await currentUser.save();
    }
    if (currentUser.firstStan === currentMember.name) {
      currentUser.firstStan = "None";
    }
    currentUser.thirdStan = currentMember.name;
    await currentUser.save();
  },
};
