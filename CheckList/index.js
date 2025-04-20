const body = document.querySelector("body");
const createTask = document.querySelector(".create-task-block");
const createTaskInput = document.querySelector(".create-task-block__input");
const taskList = document.querySelector(".tasks-list");
const overlay = document.querySelector(".modal-overlay");
const deleteCancel = document.querySelector(".delete-modal__cancel-button");
const deleteDelete = document.querySelector(".delete-modal__confirm-button");
let whichBtn;

// console.log(createTaskInput);

const tasks = [
  {
    id: "1138465078061",
    completed: false,
    text: "Посмотреть новый урок по JavaScript",
  },
  {
    id: "1138465078062",
    completed: false,
    text: "Выполнить тест после урока",
  },
  {
    id: "1138465078063",
    completed: false,
    text: "Выполнить ДЗ после урока",
  },
];

createTask.addEventListener("submit", function (e) {
  e.preventDefault();
  let newTask = {};
  let isAlreadyHave = false;
  const span = document.createElement("span");

  const existingError = createTask.querySelector(".error-message-block");
  if (existingError) {
    existingError.remove();
  }

  tasks.forEach((el) => {
    if (createTaskInput.value == el.text) {
      isAlreadyHave = true;
    }
  });

  if (createTaskInput.value === "") {
    showError("Название задачи не должно быть пустым");
  } else if (isAlreadyHave) {
    showError("Задача с таким названием уже существует.");
  } else {
    span.remove();
    newTask = {
      id: Date.now(),
      completed: false,
      text: createTaskInput.value,
    };
    tasks.push(newTask);
    drawTasks(tasks.length - 1, tasks);
  }
});

taskList.addEventListener("click", function (elem) {
  const isButton = elem.target.closest(".task-item__delete-button");
  if (isButton) {
    overlay.classList.toggle("modal-overlay_hidden");
    const onlyNums = isButton.dataset.deleteTaskId;
    whichBtn = onlyNums.replace(/\D/g, "");
  }
});

deleteCancel.addEventListener("click", () =>
  overlay.classList.toggle("modal-overlay_hidden")
);

deleteDelete.addEventListener("click", function (e) {
  for (let i = 0; i < tasks.length; i++) {
    if (whichBtn === tasks[i].id) {
      tasks.splice(i, 1);
      break;
    }
  }
  overlay.classList.toggle("modal-overlay_hidden");
  taskList.innerHTML = "";
  drawTasks(0, tasks);
});

drawTasks(0, tasks);

function drawTasks(start, end) {
  for (start; start < end.length; start++) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.dataset.taskId = tasks[start].id;

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("task-item__main-container");
    taskItem.append(mainContainer);

    const mainContent = document.createElement("div");
    mainContent.classList.add("task-item__main-content");
    mainContainer.append(mainContent);

    const form = document.createElement("form");
    form.classList.add("checkbox-form");
    mainContent.append(form);

    const input = document.createElement("input");
    input.classList.add("checkbox-form__checkbox");
    input.type = "checkbox";
    input.id = `task=${tasks[start].id}`;
    form.append(input);

    const label = document.createElement("label");
    label.htmlFor = `task=${tasks[start].id}`;
    form.append(label);

    const span = document.createElement("span");
    span.classList.add("task-item__text");
    span.innerText = `${tasks[start].text}`;
    mainContent.append(span);

    const button = document.createElement("button");
    button.classList.add(
      "task-item__delete-button",
      "default-button",
      "delete-button"
    );
    button.dataset.deleteTaskId = `task=${tasks[start].id}`;
    button.innerText = "Удалить";
    mainContainer.append(button);

    taskList.append(taskItem);
  }
}

function showError(text) {
  const span = document.createElement("span");
  span.classList.add("error-message-block");
  span.innerText = text;
  createTask.append(span);
}
