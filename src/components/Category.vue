<template>
  <div>
    <h2>{{ category }}</h2>
    <task v-for="task in filteredTasks" :key="task.id" :task="task"></task>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { TaskType } from '@/types/types'
import { useTaskStore } from '@/stores/tasks'

export default defineComponent({
  props: {
    category: String,
    tasks: Array as () => TaskType[]
  },
  computed: {
    filteredTasks(): TaskType[] {
      if (!this.category) {
        return this.tasks
      } else {
        return this.tasks.filter((task) => task.category === this.category)
      }
    }
  }
})
</script>
