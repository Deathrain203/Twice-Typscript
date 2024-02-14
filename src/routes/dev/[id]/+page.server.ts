import { Member, User } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { applicationKey, applicationKeyId} from "$env/static/private";

export const load: PageServerLoad = async (event) =>{
    const session = event.locals.session;
    if(!session){
        redirect(302, '/signin')
    }   
    const currentUser = await User.findById(session.userId)
    if(!currentUser?.dev){
        redirect(302, '/members')
    }
    const member = await Member.findById(event.params.id)


    return{
        member: JSON.parse(JSON.stringify(member)),
        user_admin: currentUser?.dev

    }






}

export const actions : Actions = {
    desc: async (event) =>{
        const data = await event.request.formData();
        const description : any= data.get('description')
        const currentMember : any= await Member.findById(event.params.id)
        currentMember.description = description
        await currentMember.save();

    },

    image: async (event) =>{
        const data = await event.request.formData();
        const file : any= data.get('image')
        if(!file){
            return {
                message: "You need an image"
            }

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

        const currentMember :any = await Member.findById(event.params.id)
        currentMember.picture = imageLink
        await currentMember.save()
        
    

    }
}