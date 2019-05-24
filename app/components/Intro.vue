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
          phrase: "Vous contrôler la vie de {nom}. Vous et votre frère Merilvius avez volé les bijoux de la reine. Hier, vous mettiez votre plan à exécution. Lors de votre fuite, vous avez été pourchassé par des gardes et vous avez été séparé de votre frère ( et il portait le trésor...). Vous décider de retourner à votre point de rendez-vous et de l'attendre..."
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

