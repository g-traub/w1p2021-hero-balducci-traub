<template>
  <div class="viewGame">
    <div class="elements">
      <h1>You Win !</h1>
     <button class="button" @click="backtohome">Retour au menu</button>
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
  z-index:4;
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
  z-index: 3;
}
</style>

<script>

import soundEl from './soundEl.vue';
import game from '../data.json';
import moneyService from "../services/moneyService";

export default {
    components:{
    soundEl
  },
  methods: {
    backtohome(){
      //clear storage
      let items = ['money', 'allies','attributes', 'inventory', , 'name', 'savedStep']; 
      for (let item of items){
         localStorage.removeItem(item);
      }
      //reset money
      moneyService.reset();
      //redirect
      this.$router.push('/');
    }
  }
};
</script>