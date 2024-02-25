<template>
  <div>
    <h2>{{ category }}</h2>
    <task-component
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @update-status="updateTaskStatus"
    ></task-component>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useTaskStore } from '@/stores/tasks'
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

const updateTaskStatus = (id: number) => {
  useTaskStore().updateTaskStatus(id)
}
</script>

