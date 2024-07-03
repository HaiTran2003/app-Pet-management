"use strict";

if (userActive) {
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  let totalResults = 0;

  getDataNews("us", 1);

  async function getDataNews(country, page) {
    try {
      const category = userActive.category; // Đảm bảo rằng category được lấy từ userActive
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=b90596302908408f845634b04ef3a0ce`
      );
      const data = await res.json();

      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      displayNewList(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  function checkBtnPrev() {
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  btnPrev.addEventListener("click", function () {
    getDataNews("us", --pageNum.textContent);
  });

  btnNext.addEventListener("click", function () {
    getDataNews("us", ++pageNum.textContent);
  });

  function displayNewList(data) {
    totalResults = data.totalResults;
    checkBtnNext();
    checkBtnPrev();

    let html = "";

    data.articles.forEach(function (article) {
      // Chỉnh sửa từ "articles" thành "article"
      html += `
        <div class="new-content">
            <div class="img-banner">
                <img src=${
                  article.urlToImage
                    ? article.urlToImage
                    : "path/to/default_image.jpg"
                } alt="img" />
            </div>

            <div class="content">
                <h4>${article.title}</h4>
                <p>${
                  article.description
                    ? article.description
                    : "No description available"
                }</p>
                <button><a href=${article.url} target="_blank">View</a></button>
            </div>
        </div>
        `;
    });

    newsContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
  window.location.assign("../index.html");
}
