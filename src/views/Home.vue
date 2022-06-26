<template>
  <AddTask v-show="showAddTask" @add-task="addTask"></AddTask>

  <Tasks
    @toggle-task="toggleTask"
    @delete-task="deleteTask"
    :tasks="tasks"
  ></Tasks>
</template>

<script>
import Tasks from "../components/Tasks.vue";
import AddTask from "../components/AddTask.vue";
const {
  GetAllTasks,
  GetTaskById,
  AddTaskAPI,
  UpdateTask,
  DeleteTask,
} = require("../services/TaskService");

export default {
  name: "",
  props: {
    showAddTask: Boolean,
  },
  components: { Tasks, AddTask },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async addTask(task) {
      const data = await AddTaskAPI(task);
      console.log(data);

      this.tasks = [...this.tasks, data];
    },

    async deleteTask(id) {
      if (confirm("Are you sure?")) {
        const res = await DeleteTask(id);
        if (res) this.tasks = this.tasks.filter((task) => task.id !== id);
      }
    },

    async toggleTask(id) {
      const res = await UpdateTask(id);
      if (res)
        this.tasks = this.tasks.map((task) =>
          task.id === id ? { ...task, reminder: !task.reminder } : task
        );
    },
  },
  async created() {
    // send API request
    this.tasks = await GetAllTasks();
  },
};
</script>

<style scoped>
</style>