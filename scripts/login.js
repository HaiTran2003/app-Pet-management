"use strict";

const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    const user = userArr.find(
      (item) =>
        item.username === inputUserName.value &&
        item.password === inputPassword.value
    );

    if (user) {
      alert("Đăng nhập thành công !");
      saveToStorage("userActive", user);
      window.location.assign("../index.html");
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại !");
    }
  }
});

function validate() {
  let isValidate = true;
  if (inputUserName.value === "") {
    alert("Vui lòng nhập Username !");
    isValidate = false;
  }

  if (inputPassword.value === "") {
    alert("Vui lòng nhập Password !");
    isValidate = false;
  }

  return isValidate;
}
