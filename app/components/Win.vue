<template>
  <div class="viewGame">
    <div class="elements">
      <h1>You Win !</h1>
      <router-link class="button" to="/">Retour au menu</router-link>
    </div>
    <video autoplay loop>
    <source src="../assets/video/coffre.mp4">
  </video>
  <soundEl></soundEl>
  </div>
</template>

<style scoped>
.viewGame{
  display: flex;
  justify-content: center;
  align-items: center;
}
.elements{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1{
  font-size: 75px;
  color: #BA7936;
}
video{
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  top: 0;
  z-index: -1;
}
.button{
  padding: 4% 11%;
}
</style>

<script>

import soundEl from './soundEl.vue';
import game from '../data.json';

export default {
  data() {
    return {
      win: this.getWin()
    }
  },
    components:{
    soundEl
  },
  methods: {
    getWin(){
      return game.wins.find(win => win.id === this.$route.params.id)
    }
  }
};
</script>