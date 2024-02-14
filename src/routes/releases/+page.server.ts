import type { PageServerLoad } from "./$types";
import { SPOTIFY_CLIENT_ID } from "$env/static/private";
import { SPOTIFY_CLIENT_SECRET } from "$env/static/private";

export const load : PageServerLoad = async (event) =>{
    const session = event.locals.session

    let token = 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
    const requestToken: any = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
      
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:token
            
              ,
    
        },

        body: `grant_type=client_credentials`,

        
        

    })
    const requestTokenJson = await requestToken.json();

    const accessToken = requestTokenJson.access_token
    const tokenType = requestTokenJson.token_type;
    const getAlbums = await fetch(`https://api.spotify.com/v1/artists/7n2Ycct7Beij7Dj7meI4X0/albums?limit=20`, {
        headers:{
            'Authorization': 'Bearer ' + accessToken
         }
    })

    const albums = await getAlbums.json();

    return {album: albums}

    
}