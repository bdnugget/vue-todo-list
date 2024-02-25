<template>
  <div id="app">
    <h1 class="title">Bd's Magnificent Todo List</h1>
    <img src="@/assets/ayylmao.gif" alt="Ayy Lmao" class="banner gif" @click="playAudio" />
    <audio src="/src/assets/Sweet_Little_Dead_Bunny.ogg" ref="audioPlayer"></audio>
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import TodoList from './components/TodoList.vue'

const playAudio = () => {
  const audioPlayer = document.querySelector('audio') as HTMLAudioElement
  audioPlayer.play()
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Ensure the app takes up the full viewport height */
}

.title {
  font-size: 3em;
  margin-bottom: 10px;
}

.banner {
  width: 100%;
  margin-bottom: 20px; /* Add some spacing between the banner and the input fields */
}
</style>
