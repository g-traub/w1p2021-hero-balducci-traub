<template>
  <div class="big-header">
    <h1>Nom du jeu</h1>
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
    Continue
    </button>
    <router-link class="button" to="/settings">Settings</router-link>
    <br/>
    <footer>
      <h2>Made by Victor Balducci &amp; Guillaume Traub</h2>
      <a href="https://github.com/g-traub/w1p2021-hero-Balducci-Traub"><p>Check out the code on github</p></a>
    </footer>
     <soundEl></soundEl>
  </div>
</template>

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
