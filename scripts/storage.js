"use strict";

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const users = getFromStorage("useArr") ? getFromStorage("useArr") : [];

const userArr = users.map((user) => parseUser(user));

let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

const todoArr = todos.map((todo) => parseTask(todo));

function parseUser(userData) {
    const user = new User(
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password,
        userData.pageSize,
        userData.category
    );

    return user;
}

function parseTask(taskData) {
    const task = new Task(taskData.task, taskData.owner, taskData.isDone);
    return task;
}
