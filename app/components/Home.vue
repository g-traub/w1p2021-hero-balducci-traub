
<template>
  <div class="viewGame">
    <div class="hero">
      <div class="titles">
        <h1>The stolen jewelry of the queen</h1>
        <br/>
        <h2>L'histoire dont vous êtes le héro</h2>
      </div>
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
     <soundEl></soundEl>
  </div>
</template>

<style scoped>
.viewGame{
  background-image: url('../assets/img/bghome.jpg');
}
.hero{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.titles{
  margin: 0 auto;
  text-align: center;
}
h1{
  font-size: 65px;
  margin-top: 10vh;
}
h2{
  font-size: 34px;
  color: #BA7936;
  margin-top: 10px;
}
footer{
 display: flex;
 flex-direction: row;
 position: absolute;
 bottom: 5px;
 left: 5px;
 z-index:0;
}
footer a{
 text-decoration: none;
 color: #BA7936;
 margin-left: 5px;
}
</style>

<script>
import soundEl from './soundEl.vue';

export default {
  data() {
    return {
     savedState: localStorage.getItem('savedStep') ? localStorage.getItem('savedStep') : '1'
    };
  },
  components:{
    soundEl
  },
  methods: {
    redirect: function(url){
      this.$router.push(url);
    }
  }
};
</script>
