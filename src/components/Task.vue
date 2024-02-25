<template>
  <div>
    <input type="checkbox" v-model="task.completed" @change="updateStatus" />
    <span :class="{ completed: task.completed }">{{ task.name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TaskType } from '@/types/types'
import { useTaskStore } from '@/stores/tasks'

export default defineComponent({
  props: {
    task: Object as () => TaskType
  },
  methods: {
    updateStatus() {
      useTaskStore().updateTaskStatus(this.task.id)
    }
  }
})
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
