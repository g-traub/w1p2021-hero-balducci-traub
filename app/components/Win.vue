<template>
  <div class="big-header">
    <h1>{{win.title}}</h1>
    <p>{{win.text}}</p>
    <router-link class="button" to="/">Back to Home</router-link>
  </div>
</template>

<script>
import game from '../data.json';

export default {
  data() {
    return {
      win: this.getWin()
    }
  },
  methods: {
    getWin(){
      return game.wins.find(win => win.id === this.$route.params.id)
    }
  }
};
</script>