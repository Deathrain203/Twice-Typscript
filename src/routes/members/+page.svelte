<script lang="ts">
    import Header from '$lib/Header.svelte';
    import MemberCard from '$lib/MemberCard.svelte';
    export let data
    
</script>
<svelte:head>
    <title>Members</title>
</svelte:head>
<Header />
<div class = "Hero">
<h1>Members</h1>
<p>Our Beloved Members Of Twice</p>
</div>

<div class = "cardContainer">

    {#each data.memberList as member}
    <MemberCard name = {member.name} image = {member.picture} id = {member._id}/>
    {/each}
    

</div>

<style>
    .cardContainer{
        
        width:100%;
        display:flex;
        justify-content: center;
        flex-wrap: wrap;
        gap:100px;
        line-height: 10px;
        
        padding-top:2em;
        padding-bottom:2em;
    }
    h1{
     padding-top:1.5em;
        font-size:50px;
        font-weight: 300;


    }
    .Hero{
        text-align: center;
    }
    .Hero p{
font-size:1.8em;
font-weight:300;
    }
</style>