import { SPOTIFY_CLIENT_ID } from '$env/static/private';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) =>{
    

    

    let token = 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
    

    const postResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
      
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:token
            
              ,
    
        },

        body: `grant_type=client_credentials`,

   
     
    })

    const postData = await postResponse.json()

    const accessTkn = postData.access_token
    const tknType = postData.token_type

   



   
   

    
    

    const response = await fetch(`https://api.spotify.com/v1/albums/${event.params.id}`,{
    


        headers:{
           'Authorization': 'Bearer ' + accessTkn
        }
    })

    const data = await response.json()
console.log(data)
   
    return { post: data }
  
  
    
}