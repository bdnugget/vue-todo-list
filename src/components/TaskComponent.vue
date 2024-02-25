<template>
  <div>
    <input type="checkbox" :checked="task.completed" @change="updateStatus" />
    <span :class="{ completed: task.completed }">{{ task.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import type { TaskType } from '@/types/types';

const TaskComponent = defineProps<{ task: TaskType }>();

const updateStatus = () => {
  useTaskStore().updateTaskStatus(TaskComponent.task.id);
};

</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
