<script lang="ts">
  import { enhance } from "$app/forms";
    import Header from "$lib/Header.svelte";
    export let data
   
</script>

<svelte:head>
    <title>{data.member.name}</title>
</svelte:head>

<Header />

<div class = "main">
    
    <div class = "details">
        
    <h1>{data.member.name}</h1>
    <form class = "editDesc" action = "?/desc" method = "POST">
  <textarea name = "description">{data.member.description}</textarea>  
  <button class = "save" type = "submit">Save</button>
</form>
</div>
<form class = "editImage" action = "?/image" method = "POST" enctype="multipart/form-data">
<img  src = {data.member.picture} alt = {data.member.name}/>
<div>
<input type = 'file' name = "image"/>
<button class = "save" type = "submit">Save</button>
</div>
</form>

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

    .details textarea{
        width: 600px;
        line-height: 30px;
        resize:none;
        height:300px;
        border:none;
        font-family: "Roboto";
        font-size:1em;
        outline:none;
        
    }
    img{
        width:400px
    }
  .save{
    height:30px;
    width:100px;
    background-color: pink;
    border:none;
    border-radius: 10px;
    box-shadow: 1px 1px 3px gray;
  }
   
</style>


