<script lang="ts">
  import Header from "$lib/Header.svelte";
  import { sineInOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";

  export let data;

  let modalOpen: boolean = false;
  let imageFile: any;
  let imagePreview: any;

  onMount(() => {
    let handler = (e: any) => {
      const theProfileDropdown = document.getElementById("modalDiv");
      if (theProfileDropdown && !theProfileDropdown.contains(e.target)) {
        modalOpen = false;
      }
    };

    document.addEventListener("mousedown", handler);
  });
  async function previewImage() {
    const fr = new FileReader();
    if (imageFile) {
      fr.readAsDataURL(imageFile[0]);
      fr.onload = function (e) {
        if (this.result) {
          imagePreview = this.result;
        }
      };
    }
  }

  async function openModal() {
    modalOpen = true;
  }

  async function update() {
    await fetch("/api/update");
  }
</script>

<Header />

{#if modalOpen}
  <div class="overlay">
    <div
      class="modalDiv"
      id="modalDiv"
      transition:fly={{ duration: 250, y: -100, easing: sineInOut }}
    >
      <button
        class="closeModal"
        on:click={() => {
          modalOpen = false;
        }}
      >
        <span class="material-symbols-outlined"> close </span></button
      >
      <div class="imageDiv" id="changeImage">
        <img
          class="pfp"
          alt="profile"
          id="pfp"
          src={imagePreview ? imagePreview : data.pfp}
        />
      </div>

      <label for="filePfp" class="fileInputLabel"
        ><span class="material-symbols-outlined"> upload </span></label
      >
      <form enctype="multipart/form-data" method="POST" action ="?/image">
        <input
        accept="image/*"
          type="file"
          id="filePfp"
          name="file"
          class="fileInput"
          bind:files={imageFile}
          on:change={previewImage}
        />
        {#if imagePreview}
          <div class="pfpBtnDiv">
            <button type="submit" class="approvePfp"> Confirm </button>
          </div>
        {/if}
      </form>
    </div>
  </div>
{/if}

<div class="mainFocus">
  <div class="profileDetails">
    <button on:click={openModal}>
      <div class="imageDiv">
        <img class="pfp" alt="profile" src={data.pfp} />
      </div>
    </button>
    <div class="details">
      <h1>{data.username}</h1>
    </div>
  </div>

  <div class = "favouritesList">
    <p class = "stans">
        #1: {data.firstStan} <br />

    #2:  {data.secondStan} <br />
    #3: 
    
    
     {data.thirdStan}
    
    
    </p>
  </div>
  {#if data.dev}
<a class = "devNav" href = "/dev">

  <button class = "devBtn">
    Dev Panel
  </button>
 
</a>
{/if}
<form class = "signout" action = "?/signout" method = "POST">
  <button  type = "submit">Sign Out</button>
</form>

</div>

<style>
  .mainFocus {
    border: 0.1vw solid rgb(160, 160, 160);
    height: 500px;
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 8em;
    box-shadow: 25px 25px rgb(255, 155, 172);
    padding: 1em;
  }

  .profileDetails {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .imageDiv {
    overflow: hidden;
    width: 120px;
    height: 120px;
    border-radius: 100%;
    background: transparent;
    border: none;
  }
  .profileDetails button {
    border-radius: 100%;
    background-color: transparent;
    border: none;
  }

  .pfp {
    width: 120px;
  }

  .details h1 {
    font-weight: 350;
  }

  .modalDiv {
    background-color: white;
    width: 600px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
  }
  #changeImage {
    margin-top: 2em;
  }
  .overlay {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.4);
  }

  .fileInput {
    display: none;
  }
  .fileInputLabel {
    box-shadow: 2px 2px 4px rgb(188, 188, 188);
    width: 120px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgb(255, 186, 198);
    color: rgb(70, 70, 70);
    border-radius: 10px;
    margin-top: 20px;
  }

  .pfpBtnDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
    gap: 40px;
  }

  .pfpBtnDiv button {
    width: 80px;
    height: 30px;
    box-shadow: 1px 1px 5px rgb(189, 189, 189);
    border-radius: 5px;
    border: none;
    font-size: 0.7em;
    color: rgb(53, 53, 53);
  }
  .approvePfp {
    background-color: #fccfa6;
  }
  .closeModal {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background-color: transparent;
    margin-left: 95%;

    color: lightgray;
  }

  .favouritesList{
   
    display: flex;
    
    margin-top: 30px;
  align-items: center;
    
    
  }
  .stans{
    line-height: 40px;
    font-size:1.3em;
  }
  
  .devBtn{
    height:50px;
    width:200px;
    font-size:1.4em;
 
    background-color: rgb(255, 137, 154);
    color:rgb(31, 31, 31);
    border:none;
    border-radius: 15px;
    
  }
  .devNav{

    align-self: center;

  }

  .signout{

    text-align: center;
    
  }
  .signout button{
    margin-top:10px;
    width:100px;
    height:30px;
    background-color: rgb(168, 44, 44);
    border: none;
    color:white;
    border-radius: 20px;
  }
</style>
