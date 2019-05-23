<template>
  <div class="viewGame">
    <div class="elements">
      <h1>Personnage</h1>
      <br>
      <div class="characters">
        <div class="character__name">
          <label for="name">Nom</label>
          <input v-model="name" type="text" id="name" name="name" maxlength="32">
        </div>
        <div class="character__attributes">
          <div class="character__attributes--title">
            <h2>Caractéristiques</h2>
            <h2>
              Total:
              <span>{{ total }}</span>
            </h2>
          </div>
          <div>
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
          <div>
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
          <div>
            <label for="dexterity">Dexterité</label>
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
          <div>
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
          <div>
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
        <soundEl></soundEl>
      </div>
      <button :class="(total > 0 || name === '') ? 'inactive' : '' " :disabled="(total > 0 || name === '')" @click="function() {setAttributes();setName();redirect('/game/1')}" class="button" >Commencer votre aventure</button>
    </div>
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
.viewGame{
  display: flex;
  align-items: center;
  justify-content: center;
}
h1{
  font-size: 75px;
  color: #ffffff;
  margin-top: 10px;
}
h2{
  color: #BA7936;
  font-size: 20px;
  font-family: amarante;
  padding:5px;
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
  font-family: amarante;
}
.character__attributes--title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
label{
  color: #BA7936;
}
span{
  color: #ffffff;
}
.viewGame{
  background: url('../assets/img/bg.png')
}
.inactive {
  color: #c6c6c6;
  cursor: initial;
  background-color: #EEE;
}

</style>

