const todoinput = document.querySelector("#input");
const todoform = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo_list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((taskText) => createTaskElement(taskText));

todoform.addEventListener("submit", formHandler);

function formHandler(event) {
  event.preventDefault();

  const taskText = todoinput.value;
  if (!taskText.trim()) return;

  createTaskElement(taskText);

  tasks.push(taskText);
  saveTask();

  todoinput.value = "";
  todoinput.focus();
}
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.innerText = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("role", "button");
  deleteBtn.setAttribute("class", "deleteBtn");
  deleteBtn.innerText = "delete";

  deleteBtn.addEventListener("click", function () {
    deleteTask(li, taskText);
  });

  li.append(deleteBtn);
  todoList.append(li);
}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(li, taskText) {
  li.remove();
  tasks = tasks.filter((task) => task !== taskText);
  saveTask();
}
