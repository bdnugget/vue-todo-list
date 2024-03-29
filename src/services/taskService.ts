const API_URL = 'http://192.168.178.115:3000/api/tasks'
import type { TaskType } from '@/types/types'

export async function getAllTasks() {
  try {
    const response = await fetch(API_URL)
    // const data = await response.json();
    // return data;
    return response
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

export async function createTask(task: TaskType) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    // const data = await response.json();
    // return data;
    return response
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

export async function updateTaskStatus(taskId: string) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: taskId })
    })
    // const data = await response.json();
    // return data;
    return response
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

export async function deleteTask(taskId: string) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE'
    })
    // const data = await response.json();
    // return data;
    return response
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

export async function deleteTasks(taskIds: string[]) {
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskIds)
    })
    // const data = await response.json();
    // return data;
    return response
  } catch (error) {
    console.error('Error deleting tasks:', error)
    throw error
  }
}
