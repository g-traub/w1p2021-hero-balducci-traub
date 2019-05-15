<template>
  <div class="big-header">
    <h1>{{ message }}</h1>
    <br />
    <router-link class="button" to="/game/1">Go to Page</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Hetic'
    };
  }
};
</script>
