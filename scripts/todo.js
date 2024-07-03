"use strict";

if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();

  function displayTodoList() {
    let html = "";

    todoArr
      .filter((todo) => todo.owner === userActive.username)
      .forEach(function (todo) {
        html += `
            <li class = ${todo.isDone ? "checked" : ""} >${
          todo.task
        }<span class ="close">x</span></li>
            `;
      });
    todoList.innerHTML = html;

    eventToggleTask();
    eventDeleteTask();
  }

  btnAdd.addEventListener("click", function () {
    if (inputTask.value.trim().length === 0) {
      alert("Vui lòng nhập nhiệm vụ !");
    } else {
      const todo = new Task(inputTask.value, userActive.username, false);

      todoArr.push(todo);
      saveToStorage("todoArr", todoArr);
      displayTodoList();
      inputTask.value = "";
    }
  });

  function eventToggleTask() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.username &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );

          todo.isDone = liEl.classList.contains("checked") ? true : false;

          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  function eventDeleteTask() {
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        const isDelete = confirm("Bạn xác nhận muốn xóa ?");

        if (isDelete) {
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );

          todoArr.splice(index, 1);

          saveToStorage("todoArr", todoArr);

          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
  window.location.assign("../index.html");
}
