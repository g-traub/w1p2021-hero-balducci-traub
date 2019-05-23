<template>
  <div class="viewGame one">
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
    <svg class="home" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M93.3,49.6L81.9,38.2l-2.7-2.7l-4.6-4.6L53.9,10.1c-2.1-2.1-5.6-2.1-7.7,0L25.3,30.9l-4.9,4.9l-2.4,2.4L6.7,49.6  c-2.2,2.2-2.2,5.9,0,8.1l0.1,0.1c2.2,2.2,5.9,2.2,8.1,0l3.2-3.2v30.9c0,3.3,2.7,6,6,6h12.1c2.3,0,4.2-1.6,4.6-3.8  c0.1-0.3,0.1-0.6,0.1-0.8V64.4h18.5v22.4c0,0.3,0,0.6,0.1,0.8c0.4,2.2,2.3,3.8,4.6,3.8H76c3.3,0,6-2.7,6-6V54.6l3.2,3.2  c2.2,2.2,5.9,2.2,8.1,0l0.1-0.1C95.6,55.5,95.6,51.8,93.3,49.6z"/></svg>
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
<style lang="scss" scoped>
.home{
  position: absolute;
  width: 38px;
  height: 38px;
  fill: #fff;
  left: 10px;
  bottom: 10px;
}
.one{
  &.viewGame{
    background: url('../assets/img/bg.png');
  }
}
</style>
