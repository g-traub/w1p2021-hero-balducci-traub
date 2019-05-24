<template>
  <div class="viewGame">
    <div class="elements">
        <p>Vous controler la vie de {{nom}}. Vous avez volé les bijoux de la reine avec votre frère merilvius. Votre frère c’est fait arreté par les gardes royale. Il est en jaule. Vous incarné le hero qui va tous faire pour faire sortir son frère de prison.</p>
        <router-link class="button" to="game/">Commencer</router-link>
    </div>
  <soundEl></soundEl>
  </div>
</template>

<style scoped>
.viewGame{
  background-image: url('../assets/img/bg.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.elements{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
</style>

<script>
import soundEl from './soundEl.vue';

export default {
    data() {
        return {
        };
    },
    components:{
        soundEl
    },
    methods: {
    }
};
</script>
