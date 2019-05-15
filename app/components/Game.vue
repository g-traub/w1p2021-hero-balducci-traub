<template>
  <div class="big-header">
    <router-link class="button" to="/">Go to Home</router-link>
    <h1>{{step.title}}</h1>
    <p>{{step.text}}</p>
    <li
    :actions="step.actions"
    v-for="action in step.actions"
    class="button" 
    @click="doAction(action)"
    v-if="canDo(action)"
    >click for action</button>
  </div>
</template>

<script>
import game from '../data.json';
import countService from '../services/countService';
import moneyService from '../services/moneyService';

export default {
  data() {
    return {
      step: this.getStep(),
      count: countService.value()
    }
  },
  methods: {
    getStep(){
      return game.steps.find(step => step.id === this.$route.params.id)
    },
    doAction(action){
      console.log('action');
      if (action.money){
        moneyService.increment(10);
      }
      this.$router.push(action.to);
    },
    canDo(){
      return !action.need.money || this.count >= action.need.money
    } 
  },
  watch: {
    '$route.params.id' (to, from){
      this.getStep();
    }
  }
};
</script>