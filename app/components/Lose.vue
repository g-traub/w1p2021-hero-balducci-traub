<template>
  <div class="lose" :class="(lose.id === '1') ? 'arrested' : 'dead'">
    <div class="elements">
      <h1>{{lose.title}}</h1>
      <p>{{lose.text}}</p>
    </div>
    <div class="buttoncontent">
      <router-link disabled class="button" to="#">Dernier checkpoint</router-link>
      <button class="button" @click="backtohome">Retour au menu</button>
    </div>
    <soundEl></soundEl>
  </div>
</template>

<style scoped>
.lose{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.elements{
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
}
h1{
  font-size: 75px;
  color: #991919;
  margin-bottom: 10px;
}
p{
  color:#A5A19E;
  font-size: 40px;
}
.buttoncontent{
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
}
.button{
  background: linear-gradient(#9E9E9E, #FFFFFF);
  margin: 2rem auto;
  color: #555555;
  font-size: 1.3rem;
}
.lose.dead{
  background: url('../assets/img/tachessang.png') #000 center center / contain no-repeat;
}
.lose.arrested{
  background: url('../assets/img/barreauxprison.png')#000  center center / contain no-repeat;
}
</style>

<script>
import game from '../data.json';
import soundEl from './soundEl.vue';
import moneyService from "../services/moneyService";

export default {
  data() {
    return {
      lose: this.getLoss()
    }
  },
    components:{
    soundEl
  },
  methods: {
    getLoss(){
      return game.lose.find(loss => loss.id === this.$route.params.id)
    },
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