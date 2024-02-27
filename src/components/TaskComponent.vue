<template>
  <div>
    <input type="checkbox" :checked="task.completed" @change="updateStatus" />
    <span :class="{ completed: task.completed }">{{ task.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskType } from '@/types/types'

const TaskComponent = defineProps<{ task: TaskType }>()

const updateStatus = async () => {
  useTaskStore().updateTaskStatus(TaskComponent.task.id)

  try {
    const response = await fetch(`http://192.168.178.115:3000/api/tasks/${TaskComponent.task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !TaskComponent.task.completed })
    })
    if (!response.ok) {
      console.error('Failed to update task status:', response.statusText)
    }
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
