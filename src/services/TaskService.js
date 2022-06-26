const baseUrl = "http://localhost:5000/";

// get all tasks
const GetAllTasks = async () => {
  const res = await fetch(baseUrl + "tasks");
  if (res.status === 200) {
    const data = await res.json();
    return data.filter((x) => x.isDeleted !== true);
  }
};

// get task by id
const GetTaskById = async (id) => {
  const res = await fetch(baseUrl + "tasks/" + id);
  if (res.status === 200) return await res.json();
};

// add a task
const AddTaskAPI = async (task) => {
  if (task.text) {
    const res = await fetch(baseUrl + "tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (res.status === 201 || res.status === 200) return await res.json();
  }
};

// update a task
const UpdateTask = async (id) => {
  const task = await GetTaskById(id);
  const updTask = { ...task, reminder: !task.reminder };

  const res = await fetch(baseUrl + "tasks/" + id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(updTask),
  });
  return res.status === 200;
};

// delete a task
const DeleteTask = async (id) => {
  /* Hard Delete */
  // const res = await fetch(baseUrl + "tasks/" + id, {
  //   method: "DELETE",
  //   headers: { "Content-type": "application/json" },
  // });
  // return res.status === 200;

  /* Soft Delete */
  const task = await GetTaskById(id);
  const updTask = { ...task, isDeleted: true };

  const res = await fetch(baseUrl + "tasks/" + id, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(updTask),
  });
  return res.status === 200;
};

module.exports = {
  GetAllTasks,
  GetTaskById,
  AddTaskAPI,
  UpdateTask,
  DeleteTask,
};
