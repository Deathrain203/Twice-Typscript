<script lang="ts">
    export let item : any
    let paused = true
</script>

<div class = "songCard">
    {#if paused}
    <button on:click = {() => paused = !paused}>
        
        
        <span class="material-symbols-outlined">
        play_circle
        </span>
    
    </button>

    {:else}

    <button on:click = {() => paused = !paused}>
        
        
        <span class="material-symbols-outlined">
            stop_circle
            </span>
    
    </button>

    {/if}

    


<p class = "songNames">
    {item.name}</p>
    
    
<audio bind:paused  src = {item.preview_url} />
    
    
    
    


</div>
    


<style>
        .songNames{
        font-size:2em;
    }
    .songCard{
        display:flex;
    }

    button{
        background:transparent;
        border:none
    }


.material-symbols-outlined {
    font-size:2em;
    cursor: pointer;

  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48,

  
}

</style>