
<template>
  <div class="viewGame">
    <div class="hero">
      <h1>The stolen jewelry of the queen</h1>
      <br/>
      <h2>L'histoire dont vous êtes le héro</h2>
      <br/>
      <router-link 
      v-if="!savedState || savedState === '1' ? true : false"
      class="button" 
      to="/character-customization">
      Start
      </router-link>
      <button
      v-else
      class="button"
      @click="redirect(`game/${savedState}`)">
      Continuer
      </button>
      <br/>
    </div>
    <footer>
      <p>Made by Victor Balducci &amp; Guillaume Traub</p>
      <a href="https://github.com/g-traub/w1p2021-hero-Balducci-Traub"><p>Check out the code on github</p></a>
    </footer>
    <img src="../assets/img/volumehigh.png" class="sound">
  </div>
</template>

<style scoped>
.viewGame{
  background-image: url('../assets/img/bghome.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vW;
}
.hero{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 97%;
  width: 100%;
}
h1{
  font-size: 65px;
  font-family: amarante, Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  margin-top: 150px;
}
h2{
  font-size: 34px;
  font-family: amarante, Helvetica, sans-serif;
  color: #BA7936;
  margin-top: 10px;
}
.button{
  width: 258px;
  height: 58px;
  border-radius: 15px;
  background-color: #49332F;
  margin-top: 290px;
  color: white;
  font-size: 20px;
}
footer{
 display: flex;
 flex-direction: row;
}
footer a{
 text-decoration: none;
 color: white;
 margin-left: 5px;
  color: #BA7936;
}
footer p{
  margin-left: 5px;
}
.sound{
  position:absolute;
  right: 10px;
  bottom: 10px;

}
</style>

<script>
export default {
  data() {
    return {
     savedState: localStorage.getItem('savedStep') ? localStorage.getItem('savedStep') : '1'
    };
  },
  methods: {
    redirect: function(url){
      this.$router.push(url);
    }
  }
};
</script>
