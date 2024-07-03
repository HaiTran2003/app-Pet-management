'use strict'

const InputFirstName = document.getElementById("input-firstname");
const InputLastName = document.getElementById("input-lastname");
const InputUserName = document.getElementById("input-username");
const InputPassword = document.getElementById("input-password");
const InputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
    const user = new User(
        InputFirstName.value,
        InputLastName.value,
        InputUserName.value,
        InputPassword.value
    );

    const isValidate = validate(user);

    if (isValidate) {
        userArr.push(user);
        saveToStorage("useArr", userArr); // Sửa lỗi useArr thành userArr
        alert("Đăng ký thành công !");
        window.location.assign("../pages/login.html");
    }
});

function validate(user) {
    let isValidate = true;

    if(user.firstname.trim().length === 0) { // Sửa firstname
        alert("Vui lòng nhập First Name !");
        isValidate = false;
    }

    if(user.lastname.trim().length === 0) {
        alert("Vui lòng nhập Last Name !");
        isValidate = false;
    }

    if(user.username.trim().length === 0) { // Sửa username
        alert("Vui lòng nhập User Name !");
        isValidate = false;
    }

    if(user.password === "") {
        alert("Vui lòng nhập password !");
        isValidate = false; // Bổ sung dòng này để khắc phục lỗi khi không có password
    }

    if (InputPasswordConfirm.value === "") {
        alert("Vui lòng nhập Confirm Password !");
        isValidate = false;
    }

    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].username === user.username) {
            alert("User Name đã tồn tại !");
            isValidate = false;
            break;
        }
    }

    if (user.password !== InputPasswordConfirm.value) {
        alert("Password và Confirm Password phải giống nhau !");
        isValidate = false;
    }

    if (user.password.length <= 8) {
        alert("Password phải có nhiều hơn 8 ký tự !");
        isValidate = false;
    }

    return isValidate;
}
