

<script lang="ts">
  import { enhance } from "$app/forms";
    import Header from "$lib/Header.svelte";
    import MemberCard from "$lib/MemberCard.svelte";
    export let data
    
    
</script>

<svelte:head>
    
    <title>Dev Panel</title>
</svelte:head>


<Header />
<div class = "main">
<form enctype="multipart/form-data" use:enhance class = 'createMemberForm' method = "POST">
    <label for = "name">Name:</label> 
    <input name = "name" id = "name" />
    <label for = "description">Description:</label> 
    <textarea name = "description"></textarea>
    <label for = "mainImage">Image: </label>
    <input id = "mainImage" name = "mainImage" type = "file" accept="image/*" />
    <label for = "birthday">Birthday (MM/DD/YYYY): </label>
    <input name = "birthday" id = "birthday" />
    <label for = "mainImage">Lovely: </label>
    <input type = "file" name ="lovely" accept="image/*" />
    <button type = "submit">Create</button>
</form>
<div class = "memberCards">
    {#each data.memberList as member}
    <MemberCard name = {member.name} image = {member.picture} id = {member._id} />
 
    {/each}

</div>

</div>




<style>
    .main{
        padding-top:100px;
        width:100%;
     display:flex;
     justify-content: space-around;
     

    }

.createMemberForm{
    display: flex;
    flex-direction: column;
    line-height: 50px;
    margin-left:50px;
}
textarea{
    width:500px;
    height:400px;
    resize: none;
    font-family: "Roboto";
}
input{
    width:200px;
    height:20px;
}
.memberCards{
    margin-left:400px;
    display:flex;
    gap:2vw;
    flex-wrap: wrap;
    width:40%;
}
</style>