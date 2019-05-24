<template>
  <div class="viewGame">
        <p>{{phrase.replace('{nom}', name)}}</p>
        <router-link class="button" to="game/">Commencer</router-link>
  <soundEl></soundEl>
  </div> 
</template>

<script>
import soundEl from './soundEl.vue';

export default {
    data() {
        return {
          name: localStorage.getItem('name'),
          phrase: "Vous controler la vie de {nom}. Vous avez volé les bijoux de la reine avec votre frère merilvius. Votre frère c’est fait arreté par les gardes royale. Il est en jaule. Vous incarné le hero qui va tous faire pour faire sortir son frère de prison."
        };
    },
    components:{
        soundEl
    }
};
</script>

<style scoped>
  .viewGame{
    background: url('../assets/img/bg.png');
  }
</style>

