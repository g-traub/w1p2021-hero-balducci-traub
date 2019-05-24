<template>
  <div
    class="viewGame"
    :class="step.class"
    :style="step.class.includes('fullscreen') ? {background: 'url(\'../assets/img/'+step.image+'\')'} : {background: 'url(\'../assets/img/bg.png\')'} "
  >
    <div class="money">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 35 43.75"
        enable-background="new 0 0 35 35"
        xml:space="preserve"
      >
        <g>
          <path
            d="M16.5,13v5.6c0,0.6-0.5,1-1,1s-1-0.4-1-1V13c-1.4-0.1-2.2,0.2-3.2-0.4c-2.9,4-4.8,10.1-4.8,13.7c0,5.9,4.9,7.2,11,7.2   s11-1.2,11-7.2c0-3.7-1.9-9.7-4.8-13.7C22.6,13.2,22,12.9,16.5,13z"
          ></path>
          <path
            d="M11.5,4c0,1.5,0.8,3.7,2,5.5h-1c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1h-0.9   c1.2-1.8,2-4.1,2-5.5C13.7,8.3,15.1-3.3,11.5,4z"
          ></path>
        </g>
      </svg>
      <p>{{money}}</p>
    </div>
    <div class="main-content">
      <h1>{{step.place}}</h1>
      <div class="card">
        <p>{{step.text}}</p>
        <div class="buttons">
          <button
            class="button"
            :ref="action.game"
            :disabled="!canDo(action)"
            :class="action.game ? 'game' : '' "
            v-for="action in step.actions"
            :key="action.id"
            @click="doAction(action)"
          >{{action.label}}</button>
        </div>
      </div>
    <div class="enigma" v-if="step.enigma">
      <form v-on:submit.prevent>
        <label ref="enigme" for="answer">Votre réponse : </label><br>
        <input v-model="answer" type="text" name="answer" id="answer">
        <button v-if="!answered" class="button" @click="checkAnswer(step.enigmaDetails)">Répondre</button>
      </form>
    </div>
    </div>
    <div class="images">
      <img
        v-if="step.class ? !step.class.includes('fullscreen'): true"
        :src="'../assets/img/' + step.image"
      >
    </div>
    <soundEl></soundEl>
    <div  class="home icon" @click="redirect('/home')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      enable-background="new 0 0 100 100"
      xml:space="preserve"
    >
      <path
        d="M93.3,49.6L81.9,38.2l-2.7-2.7l-4.6-4.6L53.9,10.1c-2.1-2.1-5.6-2.1-7.7,0L25.3,30.9l-4.9,4.9l-2.4,2.4L6.7,49.6  c-2.2,2.2-2.2,5.9,0,8.1l0.1,0.1c2.2,2.2,5.9,2.2,8.1,0l3.2-3.2v30.9c0,3.3,2.7,6,6,6h12.1c2.3,0,4.2-1.6,4.6-3.8  c0.1-0.3,0.1-0.6,0.1-0.8V64.4h18.5v22.4c0,0.3,0,0.6,0.1,0.8c0.4,2.2,2.3,3.8,4.6,3.8H76c3.3,0,6-2.7,6-6V54.6l3.2,3.2  c2.2,2.2,5.9,2.2,8.1,0l0.1-0.1C95.6,55.5,95.6,51.8,93.3,49.6z"
      ></path>
    </svg>
    </div>
  </div>
</template>

<script>
import game from "../data.json";
import moneyService from "../services/moneyService";
import attributesService from "../services/attributesService";
import soundEl from "./soundEl.vue";

export default {
  data() {
    return {
      name: localStorage.getItem("name"),
      inventory: this.getInventory(),
      allies: this.getAllies(),
      milestones: this.getMilestones(),
      attributes: attributesService.process(),
      money: moneyService.value(),
      answer: '',
      answered: false,
    };
  },
  components: {
    soundEl
  },
  computed: {
    step: function() {
      return game.steps.find(step => step.id === this.$route.params.id);
    }
  },
  methods: {
    getInventory() {
      if (localStorage.getItem("inventory")) {
        this.inventory = JSON.parse(localStorage.getItem("inventory"));
      } else {
        this.inventory = {
          citymap: false,
          prisonmap: false,
          lockpick: false,
          disguise: false
        };
      }
      return this.inventory;
    },
    getAllies() {
      if (localStorage.getItem("allies")) {
        this.allies = JSON.parse(localStorage.getItem("allies"));
      } else {
        this.allies = {
          homeless: false,
          mercenaries: false,
          guard: false
        };
      }
      return this.allies;
    },
    getMilestones() {
      if (localStorage.getItem("milestones")) {
        this.milestones = JSON.parse(localStorage.getItem("milestones"));
      } else {
        this.milestones = {
          foundPrison: false,
          foundWayIn: false,
          foundCellOpener: false
        };
      }
      return this.milestones;
    },
    redirect(url) {
      this.$router.push(url);
    },
    randomizeOutcome(percentage, caracName, carac) {
      return Math.random() < percentage + 0.05 * parseInt(carac[caracName]);
    },
    doAction(action) {
      if (action.game) {
        let result = this.randomizeOutcome(
          action.gameDetails.percentage,
          action.gameDetails.caracName,
          attributesService.process()
        );
        this.$refs[action.game][0].classList.add(result);
        console.log(result);
        localStorage.setItem("savedStep", action.gameDetails[result].to);
        setTimeout(() => this.redirect(action.gameDetails[result].to), 3000);
        for (let effectName in action.gameDetails[result].effects) {
          this.applyEffects(
            effectName,
            action.gameDetails[result].effects[effectName]
          );
        }
        return;
      } else if (action.effects) {
        for (let effectName in action.effects) {
          this.applyEffects(effectName, action.effects[effectName]);
        }
      }
      localStorage.setItem("savedStep", action.to);
      this.$router.push(action.to);
    },
    applyEffects(effectName, effect) {
      console.log(effectName, effect);
      if (effectName === "money") {
        console.log("yes");
        moneyService.increment(effect);
        this.money = moneyService.value();
        localStorage.setItem("money", this.money);
      } else {
        this[effectName][effect] = true;
        console.log(effectName);
        localStorage.setItem(effectName, JSON.stringify(this[effectName]));
      }
    },
    canDo(action){
      if(!action.need){
        console.log('can do');
        return true;
      }
      else {
        for (let needName in action.need){
          console.log(needName, action.need[needName]);
          if (needName === 'money'){
            return this.money >= action.need[needName]
          }
      
          return this[needName][action.need[needName]]
        }
      }
    },
    checkAnswer(details){
      this.answered = true;
      let correctAnswers = JSON.parse(details.answers);
      let result = false;
      for (let correct of correctAnswers){
        if (this.answer == correct){
          result = true;
        }
      }
      this.answered = false;
      if (result){
         this.$refs.enigme.innerHTML = 'bonne réponse !';
         setTimeout(() => {
           this.redirect(details.true.to);
         }, 2000);
      }
      else{
        this.$refs.enigme.innerHTML = 'mauvaise réponse !';
        setTimeout(() => {
           this.redirect(details.false.to);
         }, 2000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.enigma{
  text-align: center;
  margin-top: 2rem;
}
input{
  width: 300px;
  height: 25px;
  border-radius: 10px;
  margin-top:10px;
  text-align: center;
}
.enigma label{
  font-size: 1.3rem;
  color: #fff;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
.true::before,
.false::before {
  content: "";
  display: flex;
  position: absolute;
  right: 10%;
  height: 30%;
  width: 30%;
}
.true::before {
  background: url("../assets/img/reussite.gif") center center / contain
    no-repeat;
}
.false::before {
  background: url("../assets/img/echec.gif") center center / contain no-repeat;
}

.viewGame {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-content {
  z-index: 1;
}
h1 {
  font-size: 3rem;
  margin-bottom: 2rem;
}
.home {
  position: absolute;
  width: 38px;
  height: 38px;
  fill: #fff;
  left: 10px;
  bottom: 10px;
}
.one {
  .images {
    margin-left: -15px;
  }
}
.card {
  background-color: #ebe4da;
  width: 40vw;
  min-width: 200px;
  border-radius: 15px;
  padding: 10%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  .buttons {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .button {
    margin-bottom: 0;
    &:disabled{
      background-color: rgb(39, 39, 39);
      color: #666;
      &:hover{
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: none;
        cursor: not-allowed;
      }
    }
  }
  p {
    font-size: 18px;
    margin: 1rem auto;
    text-align: center;
  }
}
.money {
  background-color: #ebe4da;
  border-radius: 50%;
  border: 4px solid #553e31;
  width: 60px;
  height: 60px;
  z-index: 4;
  position: absolute;
  top: 10px;
  right: 10px;
  svg {
    fill: #553e31;
  }
  p {
    z-index: 5;
    background-color: #ba7936;
    border-radius: 50%;
    padding: 5%;
    color: #ebe4da;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
  }
}
.images {
  max-width: 40vw;
  img {
    min-width: 350px;
    border-radius: 15px;
  }
}

.two {
  &.viewGame {
    flex-direction: row-reverse;
  }
  .images {
    margin-right: -15px;
  }
  h1 {
    text-align: right;
  }
  .true::before {
    background: url("../assets/img/reussite.gif") center center / contain
      no-repeat;
  }
  .false::before {
    background: url("../assets/img/echec.gif") center center / contain no-repeat;
  }
}
.three {
  .images {
    display: none;
  }
  &.viewGame {
    justify-content: center;
    align-items: center;
  }
}
.fullscreen {
  h1 {
    background-color: #ebe4da;
    border: 4px solid #553e31;
    border-radius: 15px;
    color: #553e31;
    display: inline-block;
    padding: 2% 4%;
  }
  .main-content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.game {
  display: flex;
  justify-content: center;
  align-items: center;
}
.game::after {
  content: "";
  display: inline-block;
  background: url("../assets/img/dice.png") center center no-repeat;
  height: 28px;
  min-width: 28px;
  margin-left: 1rem;
}
</style>
