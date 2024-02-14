<script lang="ts">
  import { page } from "$app/stores";
</script>

<nav>
    <div>
    <a href = "/">Home</a>
  <a href="/members">Members</a>
  <img class = "logo" src="https://i.ibb.co/fFNfMLV/Logo-of-TWICE-svg.png" alt="Logo-of-TWICE-svg"/>
  <a href="/releases">Releases</a>
  <a href = "/profile">Profile</a>
</div>
  
</nav>


<style>
  nav {
    position: absolute;
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:0px 1px 2px rgb(198, 198, 198);
    background-color: rgb(255, 255, 255);
   
  }
  nav div{
    display:flex;
    gap:50px;
    
    width:50%;
    align-items: center;
    justify-content: center;

  }

  a{
    font-size:1.3rem;
  }

  .logo{
    width:60px;
    
  }


  
</style>
