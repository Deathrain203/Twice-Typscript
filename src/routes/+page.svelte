<script lang="ts">
    import Header from "$lib/Header.svelte";

</script>

<Header />

<div class = "mainPoint">
<h1>Twice Database</h1>
<p>Welcome to my website about my favourite KPOP-Group</p>
</div>

<div class = "otherPoint">
    <div class = "otherPointHero">
        <h2>So, Who Are They?</h2>
        <p>Twice is a South Korean girl group formed by JYP Entertainment through the 2015 reality show Sixteen. The group debuted on October 20, 2015, with the extended play (EP) The Story Begins. Twice is known for their catchy songs, vibrant performances, and a diverse array of visual concepts. The group consists of nine members: Nayeon, Jeongyeon, Momo, Sana, Jihyo (the leader), Mina, Dahyun, Chaeyoung, and Tzuyu. </p>

    </div>
    <img class = "otherPointImg" alt = "Lovely" src = "https://i.ibb.co/BCFztPC/81j1-D7m-LTL-AC-UF1000-1000-QL80.jpg" />

</div>


<style>
    h1{
        font-family: "Roboto";
        font-size: 3em;
        font-weight:400;
        color:rgb(255, 107, 132);
    }

    
    .mainPoint{
        padding-top: 5em;
        
text-align: center;

    }
    .mainPoint p{
        font-size:1.5em;
        margin-top: -10px;
        color: rgb(255, 185, 119)
    }
    .otherPoint{
        border:1px solid rgb(146, 146, 146);
        width:70%;
        height:350px;
        box-shadow: 30px 30px rgb(255, 155, 172);
        display:flex;
        align-items: center;
        padding:1.5em;
        
    }
    .otherPointHero{
        width:70%;
        height:90%;
        padding:1em;
        

    }

    h2{
        font-size:2em;
        font-weight: 400;
    }

    .otherPointHero p{
        font-size:1em;
        width:80%;
        line-height: 28px;
        
    }
    .otherPoint img{
        width:200px;
    }
</style>