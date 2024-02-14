import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { User } from "$lib/server/auth";
import { applicationKey, applicationKeyId} from "$env/static/private";
import { lucia } from "$lib/server/auth";
interface userData {
  pfp: string;
  username: string;
  firstStan: string;
  secondStan: string;
  thirdStan: string;
  dev: boolean
  
}
export const load: PageServerLoad = async (event) => {
  const session = event.locals.session;
  if (!session) {
    redirect(302, "/signin");
  }

  try {
    const currentUser: any = await User.findById(session.userId);
    const data: userData = {
      pfp: currentUser.pfp,
      username: currentUser.username,
      firstStan: currentUser.firstStan,
      secondStan: currentUser.secondStan,
      thirdStan: currentUser.thirdStan,
      dev: currentUser.dev
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const actions: Actions = {
  image: async (event) => {
    const session: any = event.locals.session;
 

    let stringRaw = `${applicationKeyId}:${applicationKey}`;
    const encodedString = btoa(stringRaw);

    const formData = await event.request.formData();
    const file: any = formData.get("file");

    const authToken = await fetch(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {
        method: "GET",
        headers: { Authorization: "Basic " + encodedString },
      }
    );
    const jsonAuthToken = await authToken.json();

    const getUploadUrl = await fetch(
      `${jsonAuthToken.apiUrl}/b2api/v2/b2_get_upload_url?bucketId=${jsonAuthToken.allowed.bucketId}`,
      {
        method: "GET",
        headers: { Authorization: jsonAuthToken.authorizationToken },
      }
    );
    const jsonUploadUrl = await getUploadUrl.json();

    const uploadFile = await fetch(jsonUploadUrl.uploadUrl, {
      method: "POST",

      headers: {
        Authorization: jsonUploadUrl.authorizationToken,
        "X-Bz-File-Name": file.name,
        "Content-Type": file.type,
        "Content-Length": file.size,
        "X-Bz-Content-Sha1": "do_not_verify",
        "X-Bz-Info-Author": "unknown",
      },
      body: file,
    });

    const fileUploaded = await uploadFile.json();

    const imageLink = `https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${fileUploaded.fileId}`;
    try {
      const currentUser: any = await User.findById(session.userId);
      currentUser.pfp = imageLink;
      await currentUser.save();
    } catch (error) {
      console.log(error);
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
};
