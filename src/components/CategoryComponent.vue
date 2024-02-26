<template>
  <div class="category">
    <h2>{{ category }}</h2>
    <div class="tasks">
      <TaskComponent v-for="task in filteredTasks" :key="task.id" :task="task"></TaskComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import TaskComponent from '@/components/TaskComponent.vue'
import type { TaskType } from '@/types/types'

const CategoryComponent = defineProps<{ category: string; tasks: TaskType[] }>()

const { category, tasks } = CategoryComponent

const filteredTasks = computed(() => {
  if (!category) {
    return tasks
  } else {
    return tasks.filter((task: TaskType) => task.category === category)
  }
})
</script>

<style scoped>
.category {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f8e403;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #333;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
