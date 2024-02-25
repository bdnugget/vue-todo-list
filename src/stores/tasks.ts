import { defineStore } from 'pinia'
import type { TaskType } from '@/types/types'

export const useTaskStore = defineStore({
  id: 'task',
  state: () => ({
    tasks: [] as TaskType[]
  }),
  actions: {
    addTask(newTask: TaskType) {
      this.tasks.push(newTask)
    },
    updateTaskStatus(id: number) {
      const task = this.tasks.find((task) => task.id === id)
      if (task) {
        task.completed = !task.completed
      }
    },
    deleteTask(id: number) {
      const index = this.tasks.findIndex((task) => task.id === id)
      if (index !== -1) {
        this.tasks.splice(index, 1)
      }
    },
    getTasks() {
      return this.tasks
    },
    setTasks(tasks: TaskType[]) {
      this.tasks = tasks
    }
  }
})
