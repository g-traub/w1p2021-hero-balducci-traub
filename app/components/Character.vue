<template>
  <div class="viewGame">
    <h1>Personnage</h1>
    <br>
    <div class="character__name">
      <label for="name">Nom : </label>
      <input v-model="name" type="text" id="name" name="name" maxlength="32">
    </div>
    <div class="character__attributes">
      <div>
        <h2>Caractéristiques : </h2>
        <h2 class="total">
          Total:
          <span>{{ total }}</span>
        </h2>
        <div class="caracs">
          <div class="carac">
            <label for="strength">Force</label>
            <input
              class="attribute"
              :value="strength"
              @input="(event) => handleChange('strength', event)"
              type="range"
              id="strength"
              name="strength"
              step="1"
              min="0"
              max="6"
            >
            <span>{{ strength }}</span>
          </div>
          <div class="carac">
            <label for="charisma">Charisme</label>
            <input
              class="attribute"
              :value="charisma"
              @input="(event) => handleChange('charisma', event)"
              type="range"
              id="charisma"
              name="charisma"
              step="1"
              min="0"
              max="6"
            >
            <span>{{ charisma }}</span>
          </div>
          <div class="carac">
            <label for="dexterity">Déxterité</label>
            <input
              class="attribute"
              :value="dexterity"
              @input="(event) => handleChange('dexterity', event)"
              type="range"
              id="dexterity"
              name="dexterity"
              step="1"
              min="0"
              max="6"
            >
            <span>{{ dexterity }}</span>
          </div>
          <div class="carac">
            <label for="intelligence">Intelligence</label>
            <input
              class="attribute"
              :value="intelligence"
              @input="(event) => handleChange('intelligence', event)"
              type="range"
              id="intelligence"
              name="intelligence"
              step="1"
              min="0"
              max="6"
            >
            <span>{{ intelligence }}</span>
          </div>
          <div class="carac">
            <label for="chance">Chance</label>
            <input
              class="attribute"
              :value="chance"
              @input="(event) => handleChange('chance', event)"
              type="range"
              id="chance"
              name="chance"
              step="1"
              min="0"
              max="6"
            >
            <span>{{ chance }}</span>
          </div>
        </div>
      </div>
      <aside class="info">
        <div class="questionmark"> ? </div>
        <p>
          Les caractéristiques ont un impact (bonus ou malus) lors des évenements aléatoire du jeu marqués par le symbole
        <span>
          <img src="../assets/img/dice.png">
        </span>
        </p>
      </aside>
    </div>
    <div>
      <button :class="(total > 0 || name === '') ? 'inactive' : '' " :disabled="(total > 0 || name === '')" @click="function() {setAttributes();setName();redirect('../intro')}" class="button" >Commencer votre aventure</button>
    </div>
    <soundEl></soundEl>
  </div>
</template>

<script>
import attributesService from "../services/attributesService";
import soundEl from './soundEl.vue';

export default {
  data() {
    return {
      name: '',
      strength: 0,
      charisma: 0,
      dexterity: 0,
      intelligence: 0,
      chance: 0,
      total: 15,
      attributes: attributesService.value()
    };
  },
    components:{
    soundEl
  },
  computed:{
    attributesNodes: function (){
      return document.querySelectorAll('.attribute')
    }
  },
  methods: {
    handleChange: function(field, event) {
      if (this.total>0){
        this[field] = event.target.value;
        const total =
          15 -
          (parseInt(this.strength) +
            parseInt(this.charisma) +
            parseInt(this.dexterity) +
            parseInt(this.intelligence) +
            parseInt(this.chance));
  
        this.total = total;
      }
      else if (this.total<=0){
        for (let node of this.attributesNodes){
          if (node.value>this[node.name]){
            node.value = this[node.name]
          }
          else if (node.value<this[node.name]){
            this[field] = event.target.value;
            const total =
              15 -
              (parseInt(this.strength) +
                parseInt(this.charisma) +
                parseInt(this.dexterity) +
                parseInt(this.intelligence) +
                parseInt(this.chance));
      
            this.total = total;
          }
        }
      }
    },
    setAttributes: function(){
      this.attributes = {
        strength: this.strength, 
        charisma: this.charisma,
        dexterity:this.dexterity,
        intelligence:this.intelligence,
        chance:this.chance,
      }
      localStorage.setItem('attributes', JSON.stringify(this.attributes));
      
    },
    setName: function (){
      localStorage.setItem('name', this.name);
    },
    redirect: function(url){
      this.$router.push(url);
    }
  }
}
</script>

<style scoped>
@media(min-width: 900px){
  .info{
    display: block !important;
  }
}
.info{
  display: none;
  border: 2px solid #EEE;
  color: #EEE;
  border-radius: 15px;
  width: 30vw;
  position: absolute;
  right: 20px;
}
.info p{
  padding: 0 1rem 1rem 1rem;
}
.info img{
  height: 18px;
  width: 18px;
  vertical-align: center;
}
.questionmark{
  display: flex;
  position: relative;
  top: -10px;
  left: -10px;
  justify-content: center;
  align-items: center;
  background-color: #482f31;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 2px solid #EEE;
}
svg{
  fill: #fff;
}
.total{
  text-align: right;
}
.carac{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40vw;
  max-width: 300px;
}
.carac label{
  width: 80px;
  text-align: right;
}
.inactive {
  color: #c6c6c6;
  cursor: initial;
  background-color: #EEE;
}

.viewGame{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background: url('../assets/img/bg.png');
}
h1{
  font-size: 75px;
  color: #fff;
  margin-top: 2%;
}
h2{
  color: #BA7936;
  font-size: 20px;
  font-family: amarante;
  padding:5px;
  text-align: center;
}
h2:not(.total){
  margin: 5% auto ;
}
.elements{
  display: flex;
  align-items: center; 
  flex-direction: column;
}
.characters{
 display: flex;
 flex-direction: column;
}
.character__name{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.character__name input{
  width: 300px;
  height: 25px;
  border-radius: 10px;
  margin-top:10px;
}
.character__name label{
  color: #BA7936;
  font-size: 20px;
  font-weight: bold;
  font-family: amarante;
}
.character__attributes{
  display: flex;
  justify-content:  space-around;
  align-items: flex-start;
  width: 100%;
}
.character__attributes label{
  margin-right:1%;
}
.character__attributes--title{
  text-align: center;
  padding: 15px;
}
label{
  color: #BA7936;
}
span{
  color: #ffffff;
}
</style>

