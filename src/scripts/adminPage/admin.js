// ==================================> DOM ASSIGMENTS <===================================

const loginMain = document.querySelector(".loginMain");
const adminMain = document.querySelector(".adminMain");

const userName = document.querySelector(".userName");
const inputPassword = document.querySelector(".inputPassword");
const loginBtn = document.querySelector(".loginBtn");

const logout = document.querySelector(".logout");

const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");
const results = document.querySelector(".results");
const searchListItemTemp = document.querySelector(".searchListItemTemp");

const bookNameInp = document.querySelector(".bookNameInp");
const authorNameInp = document.querySelector(".authorNameInp");
const bookUrlInp = document.querySelector(".bookUrlInp");
const bookDescInp = document.querySelector(".bookDescInp");
const selectInput = document.querySelector(".bookCategoryInp");
const bookFomrSubmitBtn = document.querySelector(".bookFomrSubmitBtn");

const newCategory = document.querySelector(".newCategory");

const bookFomrSubmitBtnAbout = document.querySelector(
  ".bookFomrSubmitBtnAbout"
);
const bookNameAboutInp = document.querySelector(".bookNameAboutInp");
const bookUrlAboutInp = document.querySelector(".bookUrlAboutInp");
const bookDescAboutInp = document.querySelector(".bookDescAboutInp");

// ==================================> CHECK LOGGED IN <===================================

(function () {
  document.querySelector(".adminMain").style.display = "none";

  if (
    localStorage.getItem("loggedIn") &&
    localStorage.getItem("loggedIn") === "true"
  ) {
    loginMain.style.display = "none";
    adminMain.style.display = "flex";
  }
})();

// ==================================> LOGIN <===================================

loginBtn.addEventListener("click", () => {
  if (userName.value === "admin" && inputPassword.value === "admin") {
    alert("Login Successfully");
    localStorage.setItem("loggedIn", true);

    loginMain.style.display = "none";
    adminMain.style.display = "flex";
  } else alert("Login Failed");
});

// ==================================> LOGOUT <===================================

logout.addEventListener("click", (e) => {
  if (e.target.closest(".logout").classList[1] === "logout") {
    localStorage.setItem("loggedIn", false);
    loginMain.style.display = "block";
    adminMain.style.display = "none";
  }
});

// ============================================================================> ADMIN <============================================================================

// =================================> ADD BOOK SECTION <===================================

// =========> FETCH BOOKS <=========

const fetchBooks = async (bookName) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();

  displayData(data);
};
// =========> CREATE LIST ITEM <=========

const createListItem = (data) => {
  const listItem = searchListItemTemp.content.cloneNode(true).children[0];

  const img = listItem.querySelector("img");
  const h1 = listItem.querySelector("h1");
  const h2 = listItem.querySelector("h2");

  img.src =
    data.volumeInfo.imageLinks?.smallThumbnail ??
    "/library/src/assets/images/emptyBook.jpg";
  h1.textContent = data.volumeInfo.title;
  h2.textContent = data.volumeInfo.authors?.join(", ") ?? "Unknown author";

  return listItem;
};

// =========> DISPLAY BOOKS <=========

const displayData = (data) => {
  results.innerHTML = "";
  results.append(document.createElement("ul"));

  if (data.totalItems != 0) {
    data.items.forEach((element) => {
      const currentitem = createListItem(element);

      listItemClicked(currentitem, element);

      results.append(currentitem);
    });
  } else {
    const h1 = document.createElement("h1");
    h1.textContent = "No results found";
    h1.style.paddingBottom = "1em";
    results.append(h1);
  }
};

// =========> LIST ITEM CLICKED <=========

const listItemClicked = (currentitem, element) => {
  currentitem.addEventListener("click", () => {
    !element.volumeInfo.imageLinks?.smallThumbnail &&
      (element["currentImg"] = "/library/src/assets/images/emptyBook.jpg");

    bookNameInp.value = element.volumeInfo.title;
    authorNameInp.value =
      element.volumeInfo.authors?.join(", ") ?? "Unknown author";
    bookUrlInp.value =
      element.volumeInfo.imageLinks?.thumbnail ?? element["currentImg"];
    bookDescInp.value = element.volumeInfo.description ?? "No Description";

    results.innerHTML = "";
    searchInput.value = "";
  });
};

// =========> INPUT AND BUTTON LISTENERS <=========

searchBtn.addEventListener("click", (e) => {
  const value = searchInput.value;

  value && fetchBooks(value);
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Backspace") {
    results.innerHTML = "";
  }
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// =================================> ADD BOOK TO FORM <===================================

bookFomrSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    bookNameInp.value != "" &&
    authorNameInp.value != "" &&
    bookUrlInp.value != "" &&
    bookDescInp.value != ""
  ) {
    const currentBook = {
      bookTitle: bookNameInp.value,
      bookAuthor: authorNameInp.value,
      bookUrl: bookUrlInp.value,
      bookDescription: bookDescInp.value,
      bookType: document.querySelector('input[name="bookType"]:checked').value,
      bookCategory: selectInput.disabled
        ? newCategory.value
        : selectInput.value,
      bookAddedTime: Date.now(),
    };

    console.log(currentBook);

    let date1 = new Date("05/11 /2024");

    let diff = Math.round(
      (1715421597974 - date1.getTime()) / (1000 * 3600 * 24)
    );

    console.log(diff);

    newCategory.value = "";
    bookNameInp.value = "";
    authorNameInp.value = "";
    bookUrlInp.value = "";
    bookDescInp.value = "";
  }
});

newCategory.addEventListener("keyup", (e) => {
  const value = e.target.value;

  if (value) selectInput.setAttribute("disabled", true);
  else selectInput.removeAttribute("disabled");
});

// =================================> ABOUT STORE SEND DATA  <===================================

bookFomrSubmitBtnAbout.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    bookNameAboutInp.value != "" &&
    bookUrlAboutInp.value != "" &&
    bookDescAboutInp.value != ""
  ) {
    const currentAboutData = {
      bookTitle: bookNameAboutInp.value,
      bookUrl: bookUrlAboutInp.value,
      bookDescription: bookDescAboutInp.value,
    };

    console.log(currentAboutData);

    bookNameAboutInp.value = "";
    bookUrlAboutInp.value = "";
    bookDescAboutInp.value = "";
  }
});
