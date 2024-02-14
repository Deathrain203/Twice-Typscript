<slot />

<style>
    :global(body){
        padding:0;
        margin:0;

        width:100vw;
        height:100vh;
        display: flex;
   flex-direction: column;
   align-items: center;
       font-family: "Roboto";
        overflow-x: hidden;
    }
    :global(a){
        color:black;
        text-decoration: none;
    }
    :global(button){
        cursor: pointer;
    }
</style>