<template>
  <div>
    <input type="checkbox" :checked="task.completed" @change="updateStatus" />
    <span :class="{ completed: task.completed }">{{ task.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { updateTaskStatus } from '@/services/taskService'
import type { TaskType } from '@/types/types'

const TaskComponent = defineProps<{ task: TaskType }>()

const updateStatus = async () => {
  useTaskStore().updateTaskStatus(TaskComponent.task.id)

  try {
    await updateTaskStatus(TaskComponent.task.id)
  } catch (error) {
    console.error('Error updating task status:', error)
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
