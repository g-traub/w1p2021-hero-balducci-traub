<template>
  <div class="big-header">
    <router-link class="button" to="/">Go to Home</router-link>
    <h1>{{step.title}}</h1>
    <p>{{step.text}}</p>
    <p>{{money}}</p>
    <button 
    class="button" 
    v-for="action in step.actions"
    :key="action.id"
    @click="doAction(action)"
    >{{action.label}}</button>
  </div>
</template>

<script>
import game from '../data.json';
import moneyService from '../services/moneyService';

export default {
  data() {
    return {
      step: this.getStep(),
      money: moneyService.value()
    }
  },
  methods: {
    getStep(){
      return game.steps.find(step => step.id === this.$route.params.id)
    },
    doAction(action){
      console.log('action');
      if (action.effects.money){
        moneyService.increment(action.effects.money);
      }
      this.$router.push(action.to);
    },
    canDo(action){
      return !action.need.money || this.count >= action.need.money
    } 
  },
  watch: {
    '$route.params.id' (to, from){
      this.step = this.getStep();
      this.money = moneyService.value()
    }
  }
};
</script>