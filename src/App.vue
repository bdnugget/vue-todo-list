<template>
  <div id="app">
    <h1>Bd's Magnificent Todo List</h1>
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import TodoList from './components/TodoList.vue'

defineComponent({
  name: 'App',
  components: {
    TodoList
  }
})
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
