<template>
  <div class="big-header">
    <h1>{{lose.title}}</h1>
    <p>{{lose.text}}</p>
    <router-link disabled class="button" to="#">Back to saved state</router-link>
    <router-link class="button" to="/">Back to Home</router-link>
  </div>
</template>

<script>
import game from '../data.json';

export default {
  data() {
    return {
      lose: this.getLoss()
    }
  },
  methods: {
    getLoss(){
      return game.losses.find(loss => loss.id === this.$route.params.id)
    }
  }
};
</script>