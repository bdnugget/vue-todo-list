<template>
  <div class="todo-list">
    <div class="add-task">
      <input
        type="text"
        v-model="taskName"
        placeholder="Task"
        class="task-input"
        @keydown.enter.prevent="addTask"
        ref="taskInput"
      />
      <input
        type="text"
        v-model="taskCategory"
        placeholder="Category/name"
        class="category-input"
        @keydown.enter.prevent="addTask"
      />
      <button @click="addTask" class="add-button">Add Task</button>
    </div>
    <div class="categories">
      <CategoryComponent
        v-for="(tasks, category) in categorizedTasks"
        :key="category"
        :category="category.toString()"
        :tasks="tasks"
      ></CategoryComponent>
    </div>
    <button @click="deleteCompletedTasks" class="delete-button">Delete Completed Tasks</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { TaskType } from '@/types/types'
import { useTaskStore } from '@/stores/taskStore'
import CategoryComponent from '@/components/CategoryComponent.vue'
import { v4 as uuidv4 } from 'uuid';
import {
  createTask,
  /*deleteTask,*/ deleteTasks,
  getAllTasks /*updateTaskStatus*/
} from '@/services/taskService'

const taskName = ref('')
const taskCategory = ref('')
const taskInput = ref<HTMLInputElement | null>(null) // Reference to the task input element

const taskStore = useTaskStore()

const categorizedTasks = computed(() => {
  return calculateCategorizedTasks(taskStore.tasks)
})

function calculateCategorizedTasks(tasks: any[]) {
  return tasks.reduce(
    (acc: { [x: string]: any[] }, task: { category: string }) => {
      const category = task.category
      acc[category] = acc[category] || []
      acc[category].push(task)
      return acc
    },
    {} as Record<string, TaskType[]>
  )
}

const addTask = async () => {
  if (taskName.value.trim() === '') return

  const newTask: TaskType = {
    id: uuidv4(),
    name: taskName.value,
    category: taskCategory.value || 'General',
    completed: false
  }

  try {
    const response = await createTask(newTask)
    if (response.ok) {
      taskStore.setTasks([...taskStore.tasks, newTask])
      taskName.value = ''
      taskCategory.value = ''
      focusTaskInput()
    } else {
      console.error('Failed to add task:', response.statusText)
    }
  } catch (error) {
    console.error('Error adding task:', error)
  }
}

const deleteCompletedTasks = async () => {
  const completedTasks = taskStore.tasks.filter((task) => task.completed)
  console.log(completedTasks)
  if (completedTasks.length === 0) return

  try {
    const response = await deleteTasks(completedTasks.map((task) => task.id))
    if (response.ok) {
      taskStore.setTasks(taskStore.tasks.filter((task) => !task.completed))
    } else {
      console.error('Failed to delete tasks:', response.statusText)
    }
  } catch (error) {
    console.error('Error deleting tasks:', error)
  }
}

const focusTaskInput = () => {
  if (taskInput.value) {
    taskInput.value.focus() // Focus on the task input element again after adding a task
  }
}

onMounted(async () => {
  try {
    const response = await getAllTasks()
    if (response.ok) {
      const tasks = await response.json()
      taskStore.setTasks(tasks)
    } else {
      console.error('Failed to fetch tasks:', response.statusText)
    }
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
})
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*height: 100vh; /* Ensure the app takes up the full viewport height */
}

.categories {
  display: flex;
  gap: 20px;
}

.add-task {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* Add some spacing between the input fields and the categories */
}

.task-input {
  height: 60px; /* Adjust the height of the task input field */
  margin-bottom: 10px; /* Add some spacing between the task input field and the category input field */
  margin-top: 10px;
}

.category-input {
  height: 30px; /* Keep the height of the category input field smaller */
}

.add-button {
  padding: 10px 20px; /* Add padding to the button */
  background-color: #007bff; /* Set a background color */
  color: white; /* Set text color to white */
  border: none; /* Remove border */
  border-radius: 5px; /* Add border radius */
  cursor: pointer; /* Change cursor on hover */
  margin: 10px 0; /* Add some spacing between the category input field and the button */
}

.add-button:hover {
  background-color: #0056b3; /* Darken the background color on hover */
}

.delete-button {
  padding: 10px 20px; /* Add padding to the button */
  background-color: #dc3545; /* Set a background color */
  color: white; /* Set text color to white */
  border: none; /* Remove border */
  border-radius: 5px; /* Add border radius */
  cursor: pointer; /* Change cursor on hover */
  margin: 10px 0; /* Add some spacing between the categories and the button */
}

.delete-button:hover {
  background-color: #bb2d3b; /* Darken the background color on hover */
}
</style>
