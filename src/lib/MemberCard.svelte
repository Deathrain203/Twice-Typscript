<script lang="ts">
  export let name: string;
  export let image: string;
  export let id : string;
</script>

<a href = "/members/{id}">
  <div class="card">
    <img src={image} alt={name} />
    <p>{name}</p>
  </div>
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    height: 300px;
  }
  img {
    width: 200px;
  }
  p {
    font-size: 1em;
    align-self: center;
  }
</style>
