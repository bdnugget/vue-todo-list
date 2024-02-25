<template>
  <div>
    <input type="text" v-model="taskName" placeholder="Task name" />
    <input type="text" v-model="taskCategory" placeholder="Category" />
    <button @click="addTask">Add Task</button>
    <category
      v-for="(tasks, category) in categorizedTasks"
      :key="category"
      :category="category"
      :tasks="tasks"
    ></category>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TaskType } from '@/types/types'
import { useTaskStore } from '@/stores/tasks'
import Category from '@/components/Category.vue'

export default defineComponent({
  components: {
    Category
  },
  setup() {
    const taskName = ref('')
    const taskCategory = ref('')

    const taskStore = useTaskStore()

    const categorizedTasks = taskStore.tasks.reduce(
      (acc, task) => {
        const category = task.category || 'General'
        acc[category] = acc[category] || []
        acc[category].push(task)
        return acc
      },
      {} as Record<string, TaskType[]>
    )

    const addTask = () => {
      if (taskName.value.trim() === '') return
      const newTask: TaskType = {
        id: taskStore.tasks.length + 1,
        name: taskName.value,
        category: taskCategory.value,
        completed: false
      }
      taskStore.addTask(newTask)
      taskName.value = ''
      taskCategory.value = ''
    }

    return { taskName, taskCategory, categorizedTasks, addTask }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
