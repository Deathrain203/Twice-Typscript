<script lang="ts">
    export let data;
    import Header from '$lib/Header.svelte';
    import ReleaseCard from '$lib/ReleaseCard.svelte';
 
</script>
<svelte:head>
    <title>Releases</title>
</svelte:head>

<Header />

<div class = "main">
    {#each data.album.items as album}
    <ReleaseCard item = {album}/>
    {/each}
   


    
    </div>

<style>
    .main{
        padding-top:10em;
        width:80%;
        display:flex;
        gap:100px;
        flex-wrap: wrap;
        
        align-items: center;
        justify-content: center;
    }

</style>