<template>
  <div class="big-header">
    <h1>Nom du jeu</h1>
    <br/>
    <router-link class="button" to="/character-customization">Start</router-link>
    <router-link class="button" to="/settings">Settings</router-link>
    <br/>
    <footer>
      <h2>Made by Victor Balducci &amp; Guillaume Traub</h2>
      <a href="https://github.com/g-traub/w1p2021-hero-Balducci-Traub"><p>Check out the code on github</p></a>
    </footer>
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
