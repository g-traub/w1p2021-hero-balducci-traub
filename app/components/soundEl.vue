<template>
  <div class="sound icon">
    <img v-show="sound" width="34" height="32" @click="soundHandler()" src="../assets/img/volume-high.svg">
    <img v-show="!sound" @click="soundHandler()" width="32" height="32" src="../assets/img/volume-mute2.svg">
    <audio ref="audio" autoplay>
      <source src="../assets/audio/Abyss.mp3" type="audio/mpeg">
    </audio>
    </div>
</template>

<script>
export default {
  data() {
    return {
      sound: localStorage.getItem('sound') ? JSON.parse(localStorage.getItem('sound')) : true
    }
  },
  methods:{
    soundHandler(init){
      if(init){
        this.sound ?  this.$refs.audio.play() : this.$refs.audio.pause()
        return
      }
      if (this.sound){
        this.$refs.audio.pause();
      }
      else{
       this.$refs.audio.play();
      }
      this.sound = !this.sound;
      localStorage.setItem('sound', this.sound);
    }
  },
  mounted(){
    this.soundHandler(true)
  }
}
</script>


