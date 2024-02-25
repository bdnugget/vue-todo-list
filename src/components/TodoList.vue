<template>
  <div>
    <input type="text" v-model="taskName" placeholder="Task" />
    <input type="text" v-model="taskCategory" placeholder="Category/name" />
    <button @click="addTask">Add Task</button>
    <category-component
      v-for="(tasks, category) in categorizedTasks"
      :key="category"
      :category="category"
      :tasks="tasks"
    ></category-component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { TaskType } from '@/types/types'
import { useTaskStore } from '@/stores/tasks'
import CategoryComponent from '@/components/CategoryComponent.vue'

const taskName = ref('')
const taskCategory = ref('')

const taskStore = useTaskStore()

const categorizedTasks = computed(() => {
  return taskStore.tasks.reduce((acc, task) => {
    const category = task.category || 'General'
    acc[category] = acc[category] || []
    acc[category].push(task)
    return acc
  }, {} as Record<string, TaskType[]>)
})

const addTask = async () => {
  if (taskName.value.trim() === '') return

  const newTask: TaskType = {
    id: taskStore.tasks.length + 1,
    name: taskName.value,
    category: taskCategory.value,
    completed: false
  }

  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });
    if (response.ok) {
      taskStore.setTasks([...taskStore.tasks, newTask]);
      taskName.value = '';
      taskCategory.value = '';
    } else {
      console.error('Failed to add task:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/tasks');
    if (response.ok) {
      const tasks = await response.json();
      taskStore.setTasks(tasks);
    } else {
      console.error('Failed to fetch tasks:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
});
</script>


<style scoped>
</style>
