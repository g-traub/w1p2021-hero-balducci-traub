<template>
  <div class="viewGame">
    <div class="elements">
        <p>{{phrase.replace('{nom}', name)}}</p>
        <router-link class="button" to="/game/1">Commencer</router-link>
    </div> 
  <soundEl></soundEl>
  </div> 
</template>

<script>
import soundEl from './soundEl.vue';

export default {
    data() {
        return {
          name: localStorage.getItem('name'),
          phrase: "Vous contrôler la vie de {nom} et vous avez volé les bijoux de la reine avec votre frère Merilvius. La veille vous partez en direction des logements de la reine, vous entrer déguisé en serviteur, une fois endormi, vous pénétrez dans ca chambre et vous subtiliser ces bijoux. Votre frère c’est fait arrété par les gardes royales lors de la cavale. Il est en jaule. Vous incarnez le héro qui va tout faire pour faire sortir son frère de prison."
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
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.elements{
    width: 60vw;
    height: auto;
}
p{
    font-size: 25px;
    color:  white;
    line-height: 1.3;
    text-justify: auto;
    text-align: center;
}
.button{
    margin-top: 10%;
}

</style>

