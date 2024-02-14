<script lang="ts">
   export let item : any
</script>

<a href = "/releases/{item.id}">
<div class = "card">
   <img src = {item.images[0].url} alt = {item.name} />
    <p>{item.name}</p>
</div>
</a>
<style>
    img{
        width:200px;
    }
    .card{
      text-align: center;
    }
    p{
        font-size:1.2em;
    }

</style>