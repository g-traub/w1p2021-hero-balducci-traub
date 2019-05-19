<template>
  <div class="big-header">
    <h1>Character</h1>
    <br />
    <router-link class="button" to="/game/1">Go to Page</router-link>
  </div>
</template>

<script>
import attributesService from '../services/attributesService';

export default {
  data() {
    return {
     attributes: attributesService.value(),
    };
  }
};
</script>
