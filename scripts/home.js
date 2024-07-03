'use strict'

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

function displayHome() {
  const userActive = getFromStorage("userActive");
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";

    welcomeMessage.textContent = `Welcome ${userActive.firstname}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

btnLogout.addEventListener("click", function() {
  const isLogout = confirm("Bạn chắc chắn muốn logout chứ ?");
  if (isLogout) {
    userActive = null;
    saveToStorage("userActive", userActive);
    displayHome();
  }
});

function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
