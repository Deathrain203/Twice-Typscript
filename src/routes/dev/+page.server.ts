import { json, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { User } from "$lib/server/auth";
import { Member } from "$lib/server/auth";
import { applicationKey, applicationKeyId } from "$env/static/private";

export const load: PageServerLoad = async (event) => {
  const session = event.locals.session;

  if (!session) {
    redirect(302, "/signin");
  }

  const currentUser = await User.findById(session.userId);
  if (!currentUser?.dev) {
    redirect(302, "/profile");
  }
const memberList = await Member.find()
  return {
    memberList : JSON.parse(JSON.stringify(memberList))
  }

};

export const actions: Actions = {
  default: async (event) => {
    const session = event.locals.session;
    const data = await event.request.formData()
    const name : any  = data.get('name')
    const image : any = data.get('mainImage')
    const birthday : any = data.get('birthday')
    const lovely : any = data.get('lovely')
    const decsription : any = data.get('description')
    
    function findAge(birthday : string){
        let currentTime : Date = new Date();
        let birthDate : Date = new Date(birthday);
        let age : number = currentTime.getFullYear() - birthDate.getFullYear();
        let month = currentTime.getMonth() - birthDate.getMonth();
        if(month < 0 || (month === 0 && currentTime.getDate() < birthDate.getDate())){
    age = age -1
        }
        return age
    
    }

    if (!session) {
      redirect(302, "/signin");
    }

    const currentUser = await User.findById(session.userId);
    if (!currentUser?.dev) {
      redirect(302, "/profile");

    }


    

    let stringRaw = `${applicationKeyId}:${applicationKey}`;
    const encodedString = btoa(stringRaw);

  

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
        "X-Bz-File-Name": image.name,
        "Content-Type": image.type,
        "Content-Length": image.size,
        "X-Bz-Content-Sha1": "do_not_verify",
        "X-Bz-Info-Author": "unknown",
      },
      body: image,
    });
    
    const uploadLovelyFile = await fetch(jsonUploadUrl.uploadUrl, {
        method: "POST",
  
        headers: {
          Authorization: jsonUploadUrl.authorizationToken,
          "X-Bz-File-Name": lovely.name,
          "Content-Type": lovely.type,
          "Content-Length": lovely.size,
          "X-Bz-Content-Sha1": "do_not_verify",
          "X-Bz-Info-Author": "unknown",
        },
        body: lovely,
      });
  

    const fileUploaded = await uploadFile.json();
    const lovelyUploaded = await uploadLovelyFile.json();


    const imageLink = `https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${fileUploaded.fileId}`;
    const lovelyLink = `https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${lovelyUploaded.fileId}`

    const newMember = await Member.create({
        name: name,
        description : decsription,
        birthday: birthday,
        picture: imageLink,
        lovely: lovelyLink,
        age: findAge(birthday),

        
    })

   
  


  },

};
