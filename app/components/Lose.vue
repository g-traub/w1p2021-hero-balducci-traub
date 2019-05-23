<template>
  <div class="lose">
    <div class="elements">
      <h1>{{lose.title}}</h1>
      <p>{{lose.text}}</p>
    </div>
    <div class="buttoncontent">
      <router-link disabled class="button" to="#">Dernier checkpoint</router-link>
      <router-link class="button" to="/">Retour au menu</router-link>
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
  cursor: pointer;
  padding: 1.2rem 5rem;
  border-radius: 15px;
  background-image: linear-gradient(#9E9E9E, #FFFFFF);
  margin: 2rem auto;
  color: #555555;
  font-size: 1.3rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
</style>

<script>
import game from '../data.json';
import soundEl from './soundEl.vue';

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
    }
  }
};
</script>