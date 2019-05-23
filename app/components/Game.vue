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
    <soundEl></soundEl>
  </div>
</template>

<script>
import game from '../data.json';
import moneyService from '../services/moneyService';
import attributesService from '../services/attributesService';
import soundEl from './soundEl.vue';

export default {
  data() {
    return {
      name: localStorage.getItem('name'),
      inventory: this.getInventory(),
      allies: this.getAllies(),
      milestones: this.getMilestones(),
      attributes: attributesService.value(),
      money: moneyService.value(),
    }
  },
  components: {
    soundEl
  },
  computed: {
    step: function () {
      return game.steps.find(step => step.id === this.$route.params.id)
    }
  },
  methods: {
    getInventory(){
      if(localStorage.getItem('inventory')){
        this.inventory = JSON.parse(localStorage.getItem('inventory'))
      }
      else {
        this.inventory = {
          citymap: false,
          prisonmap: false,
          lockpick: false,
          disguise: false
        }
      }
      return this.inventory
    },
    getAllies(){
      if(localStorage.getItem('allies')){
        this.allies = JSON.parse(localStorage.getItem('allies'))
      }
      else {
        this.allies = {
          homeless: false,
          mercenaries: false,
          guard: false
        }
      }
      return this.allies
    },
    getMilestones(){
      if(localStorage.getItem('milestones')){
        this.milestones = JSON.parse(localStorage.getItem('milestones'))
      }
      else {
        this.milestones = {
          foundPrison: false,
          foundWayIn: false,
          foundCellOpener: false
        }
      }
      return this.milestones
    },
    doAction(action){
      if (action.effects){
        if (action.effects.money){
          moneyService.increment(action.effects.money);
          this.money = moneyService.value();
        }
      }
      localStorage.setItem('savedStep', this.step.id);
      this.$router.push(action.to);
    },
/*     canDo(action){
      return !action.need.money || this.count >= action.need.money
    }, */
    randomizeOutcome(percentage, caracName, carac){
      return Math.random() < percentage + 0.5 * carac[caracName]
    },
  },
  mounted(){
    /* setTimeout(() =>{
       this.$refs.audio.pause();
    }, 3000); */
  }
};
</script>
