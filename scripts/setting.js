'use strict'

if (userActive) {
    const inputPageSize = document.getElementById("input-page-size");
    const inputCategory = document.getElementById("input-category");
    const btnSubmit = document.getElementById("btn-submit");

    btnSubmit.addEventListener("click", function () {
        if (validate()) {
            userActive.pageSize = Number.parseInt(inputPageSize.value);
            userActive.category = inputCategory.value;
            saveToStorage("userActive", userActive);

            const index = userArr.findIndex(
                (userItem) => userItem.username === userActive.username
            );
            userArr[index] = userActive;
            saveToStorage("userArr", userArr);

            alert("Cài đặt thành công !");
            inputPageSize.value = "";
            inputPageSize.value = "General";
        }
    });

    function validate() {
        let isValidate = true;

        if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
            alert("News per page không hợp lệ !");
            isValidate = false;
        }

        if (inputCategory.value === "") {
            alert("Vui lòng nhập News Category !");
            isValidate = false;
        }

        return isValidate;
    }
} else {
    alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
    window.location.assign("../index.html");
}