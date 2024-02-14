<script lang="ts">
    
    import Header from "$lib/Header.svelte"
    import Audio from '$lib/Audio.svelte'
    export let data
</script>

<Header />
<div class = "mainPage">

    <div class  = "songs">
    {#each data.post.tracks.items as item}
    
    <Audio item = {item} />
    
    {/each}
    
    </div>
    <div class = "infoDiv">
        <h1>{data.post.name}</h1>
       <img src = {data.post.images[0].url} alt = {data.post.name}/>
       
    </div>
    
    </div>
    
    <style>
    
        .infoDiv{
            display:flex;
            flex-direction: column;
        }
        .mainPage{
            font-family:'Inter';
            
            padding-top:5em;
            display:flex;
            justify-content: space-evenly;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23d5d5d5' fill-opacity='0.59'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
          width:80%;
        }
        h1{
            font-size:2.3em;
            font-weight:400;
            text-align: right;
        }
    img{
        width:400px;
    }
    
    </style>
    