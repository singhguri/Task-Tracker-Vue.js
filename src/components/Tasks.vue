<template>
  <div :key="task.id" v-for="task in tasks">
    <Task
      @toggle-task="$emit('toggle-task', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      :task="task"
    ></Task>
  </div>
</template>

<script>
import Task from "./Task.vue";
export default {
  name: "Tasks",
  props: {
    tasks: Array,
  },
  components: { Task },
  emits: ["delete-task", "toggle-task"],
};
</script>

<style></style>