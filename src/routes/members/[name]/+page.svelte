<script lang="ts">
    import Header from "$lib/Header.svelte";
    import { enhance } from "$app/forms";
    export let data

</script>

<svelte:head>
    <title>{data.member.name}</title>
</svelte:head>

<Header />

<div class = "main">
    
    <div class = "details">
        {#if data.user_admin}
        <div class = "devPanel">
            <a href = "/dev/{data.params}">
        <button class = "editBtn"><span class="material-symbols-outlined">
            edit_square
            </span></button>
        </a>
     
        <form method = "POST" action = "?/delete">
            <button class = "editBtn deleteBtn"><span class="material-symbols-outlined">
                delete
                </span></button>
            </form>
        </div>
        {/if}
    
    <h1>{data.member.name}</h1>
    <p>{data.member.description}</p>
    <div class = "favouritePanel">
        <form use:enhance method = "POST" action = "?/first">
        <button>Set First Stan</button>
    </form>
    <form use:enhance method = "POST" action = "?/second">
         <button>Set Second Stan</button>
        </form>
        <form use:enhance method = "POST" action = "?/third">
          <button>Set Third Stan</button>
        </form>
        </div>
          
</div>

<img  src = {data.member.picture} alt = {data.member.name}/>

</div>


<style>
    .main{
        padding-top:4em;
        width:80%;
        display:flex;
        align-items: center;
        justify-content: center;
       height:100%;
       margin-bottom:10em;
       gap:10em;
      
    }
    .details{
        box-shadow: 40px 40px 0px rgb(255, 155, 172);
        border: 1px solid gray;
        padding:2em;
    }

    .details p{
        width: 600px;
        line-height: 30px;
        
    }
    img{
        width:400px
    }

    .editBtn{
    
      border:none;
      background-color: white;
    }
    .deleteBtn{
        color:red;
    }

    .devPanel{
        display:flex;
        justify-content: space-between;
    }
    .favouritePanel{
        width:200px;
        display: flex;
        gap:2em;

    }

    .favouritePanel button{
        height:30px;
        width:120px;
        background-color: rgb(245, 190, 89);
        border:none;
        box-shadow: 1px 1px 4px gray;
        border-radius: 10px;

    }
</style>


