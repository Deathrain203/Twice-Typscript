<script lang="ts">
  import { enhance } from "$app/forms";
  import Header from "$lib/Header.svelte";

 interface FormData {
    message: String
}
  export let form : FormData
</script>
<Header />
<form method="POST" use:enhance>
  <div>
  <label for="username">Username:</label>
  <input name="username" id="username" placeholder="Username" />

  <label for="password">Password:</label>
  <input name="password" id="password" placeholder="Password" type="password" />

  <button type="submit">Sign In</button>

  {#if form}

  <p>{form.message}</p>
  
  {/if}
</div>
</form>

<style>
   label{
        margin-bottom:5px;
    }
    form{
        padding-top:20em;
     display:flex;
     justify-content: center;
     flex-direction: column;
     justify-self: center;
     
    
   

    }
    div{
        display:flex;
        flex-direction: column;
        padding:2em;
        border:1px solid gray;
        border-radius: 20px;
        width:300px;
        height:300px;
        box-shadow: 30px 30px pink;
        
     

    }
    input{
height:50px;
margin-bottom: 20px;
border-radius: 10px;
outline: none;
border: 1px solid gray;
font-family: "Roboto";
font-size:1em;
padding-left:10px;


    }
    button{
        background-color: pink;
        border: none;
        height:40px;
        align-self: center;
        width:200px;
        border-radius: 15px;
        font-size:1.2em;
        box-shadow: 1px 1px 4px rgb(180, 180, 180);
        margin-top:1.3em;
    }
p{
  align-self: center;
}
</style>