// =================================> IMPORT FIREBASE <===================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4Sb2LCfKwA3GW4R3VM9L34pTVqh6xnAY",
  authDomain: "library-7fefd.firebaseapp.com",
  projectId: "library-7fefd",
  storageBucket: "library-7fefd.appspot.com",
  messagingSenderId: "1078426865027",
  appId: "1:1078426865027:web:47c0a65064eb5cd0493ab6",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ==================================> DOM ASSIGMENTS <===================================

// ==================================> FECTH CATEGORIES <===================================

onValue(ref(database, "categories"), (snapshot) => {
  bookCategoryInp.innerHTML = "";
  if (snapshot.exists()) {
    const categories = Object.values(snapshot.val());

    categories.forEach((data) => {
      const option = document.createElement("option");
      option.textContent = data.category;
      option.value =
        data.category[0].toUpperCase() + data.category.slice(1).toLowerCase();

      bookCategoryInp.append(option);
    });
  } else console.log("no categories");
});

// ==================================> FECTH BOOKS <===================================

onValue(ref(database, "books"), (snapshot) => {
  booksTableBody.innerHTML = "";
  if (snapshot.exists()) {
    const books = Object.entries(snapshot.val());
    createBooksTable(books);
  } else console.log("no books");
});

// ==================================> FECTH JOINERS <===================================

onValue(ref(database, "joiners"), (snapshot) => {
  joinUsTableBody.innerHTML = "";
  if (snapshot.exists()) {
    const joiners = Object.values(snapshot.val());

    createJoinUsTable(joiners);
  } else console.log("no joiners");
});

// ==================================> FECTH CONTACT <===================================

onValue(ref(database, "contact"), (snapshot) => {
  contactUsTableBody.innerHTML = "";
  if (snapshot.exists()) {
    const contact = Object.values(snapshot.val());

    createContactUsTable(contact);
  } else console.log("no contact");
});

// ==================================> ADMIN LOGIN FIREABSE <===================================

function checkLogin(data) {
  onValue(ref(database, "adminLogin"), (snapshot) => {
    const login = snapshot.val();

    if (data.username === login.username && data.password === login.password) {
      Swal.fire({
        title: "SUCCESS!",
        text: "You have successfully logged in!",
        icon: "success",
      }).then(() => {
        localStorage.setItem("loggedIn", true);

        loginMain.style.display = "none";
        adminMain.style.display = "flex";
      });
    } else
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
  });
}

// ==================================> UPDATE ABOUT STORE FIREABSE <===================================

function updateAboutStoreData(data) {
  update(ref(database, "aboutStore"), data);
}

// ==================================> SEND BOOK DATA TO FIREABSE <===================================

function sendBookData(data) {
  push(ref(database, "books"), data);
}

// ==================================> CHECK CATEGORIES <===================================

function checkCategories(data) {
  onValue(ref(database, "categories"), (snapshot) => {
    if (snapshot.exists()) {
      const categories = Object.values(snapshot.val());

      const isExist = categories.some(
        (currentCate) =>
          currentCate.category.toLowerCase() === data.toLowerCase()
      );

      !isExist &&
        push(ref(database, "categories"), {
          category: data[0].toUpperCase() + data.slice(1).toLowerCase(),
        });
    } else console.log("no categories");
  });
}

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
const loading = document.querySelector(".loading");
const searchIcon = document.querySelector(".searchIcon");

const bookNameInp = document.querySelector(".bookNameInp");
const authorNameInp = document.querySelector(".authorNameInp");
const bookUrlInp = document.querySelector(".bookUrlInp");
const bookDescInp = document.querySelector(".bookDescInp");
const publishedDateInp = document.querySelector(".publishedDateInp");
const selectInput = document.querySelector(".bookCategoryInp");
const bookFomrSubmitBtn = document.querySelector(".bookFomrSubmitBtn");

const newCategory = document.querySelector(".newCategory");

const bookFomrSubmitBtnAbout = document.querySelector(
  ".bookFomrSubmitBtnAbout"
);
const bookNameAboutInp = document.querySelector(".bookNameAboutInp");
const bookUrlAboutInp = document.querySelector(".bookUrlAboutInp");
const bookDescAboutInp = document.querySelector(".bookDescAboutInp");

const mobileHamburger = document.querySelector(".mobileHamburger");
const closeBtnAside = document.querySelector(".closeBtnAside");

const bookCategoryInp = document.querySelector(".bookCategoryInp");

const joinUsTableBody = document.querySelector(".joinUsTableBody");
const booksTableBody = document.querySelector(".booksTableBody");
const contactUsTableBody = document.querySelector(".contactUsTableBody");
const bookTableBodyTemplate = document.querySelector(".bookTableBodyTemplate");

// ==================================> HELPER FUNCTIONS <===================================

function clearInputs() {
  newCategory.value = "";
  bookNameInp.value = "";
  authorNameInp.value = "";
  bookUrlInp.value = "";
  bookDescInp.value = "";
  publishedDateInp.value = "";
  selectInput.value = "Science";
  document.querySelector('input[value="new"]').checked = true;
  selectInput.removeAttribute("disabled");
}

// ==================================> CHECK LOGGED IN <===================================

(() => {
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
  checkLogin({
    username: userName.value,
    password: inputPassword.value,
  });
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
    "https://bookcart.azurewebsites.net/Upload/Default_image.jpg";
  h1.textContent = data.volumeInfo.title;
  h2.textContent = data.volumeInfo.authors?.join(", ") ?? "Unknown author";

  return listItem;
};

// =========> DISPLAY BOOKS <=========

const displayData = (data) => {
  results.innerHTML = "";
  const myUl = document.createElement("ul");

  if (data.totalItems != 0) {
    data.items.forEach((element) => {
      const currentitem = createListItem(element);

      listItemClicked(currentitem, element);

      myUl.append(currentitem);

      searchIcon.style.opacity = 1;
      loading.classList.add("hideLoading");
    });

    results.append(myUl);
  } else {
    const h1 = document.createElement("h1");
    h1.textContent = "No results found";
    h1.style.padding = "1em";
    results.append(h1);
    searchIcon.style.opacity = 1;
    loading.classList.add("hideLoading");
  }
};

// =========> LIST ITEM CLICKED <=========

const listItemClicked = (currentItem, element) => {
  currentItem.addEventListener("click", () => {
    bookNameInp.value = element.volumeInfo.title;
    authorNameInp.value =
      element.volumeInfo.authors?.join(", ") ?? "Unknown author";
    bookUrlInp.value =
      element.volumeInfo.imageLinks?.thumbnail ??
      "https://bookcart.azurewebsites.net/Upload/Default_image.jpg";
    bookDescInp.value = element.volumeInfo.description ?? "No Description";
    publishedDateInp.value = element.volumeInfo.publishedDate ?? "Unknown";

    results.innerHTML = "";
    searchInput.value = "";
  });
};

// =========> INPUT AND BUTTON LISTENERS <=========

searchBtn.addEventListener("click", () => {
  const value = searchInput.value;

  if (value) {
    fetchBooks(value);
    searchIcon.style.opacity = 0;
    loading.classList.remove("hideLoading");
  } else results.innerHTML = "";
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Backspace") {
    results.innerHTML = "";
  }
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

document.body.addEventListener("click", () => {
  results.innerHTML = "";
});

// =================================> ADD BOOK TO FORM <===================================

bookFomrSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (bookFomrSubmitBtn.value === "Add") {
    console.log("work1");
    if (
      bookNameInp.value.trim() &&
      authorNameInp.value.trim() &&
      publishedDateInp.value.trim() &&
      bookUrlInp.value.trim() &&
      bookDescInp.value.trim()
    ) {
      const currentBook = {
        bookTitle: bookNameInp.value.trim(),
        bookAuthor: authorNameInp.value.trim(),
        bookUrl: bookUrlInp.value.trim(),
        bookPublishedDate: publishedDateInp.value.trim(),
        bookDescription: bookDescInp.value.trim(),
        bookType: document
          .querySelector('input[name="bookType"]:checked')
          .value.toLowerCase(),
        bookCategory: selectInput.disabled
          ? newCategory.value.trim()[0].toUpperCase() +
            newCategory.value.trim().slice(1).toLowerCase()
          : selectInput.value,
        bookAddedTime: Date.now(),
      };

      sendBookData(currentBook);
      checkCategories(currentBook.bookCategory);

      // let date1 = new Date("05/09/2024");

      // let diff = Math.round(
      //   (1715421597974 - date1.getTime()) / (1000 * 3600 * 24)
      // );

      // console.log(diff);

      clearInputs();

      Swal.fire({
        icon: "success",
        title: "Book added successfully!",
      });
    }
  } else {
    console.log("work2");
    console.log(bookNameInp.dataset.id);

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        update(ref(database, "books/" + bookNameInp.dataset.id), {
          bookTitle: bookNameInp.value.trim(),
          bookAuthor: authorNameInp.value.trim(),
          bookUrl: bookUrlInp.value.trim(),
          bookPublishedDate: publishedDateInp.value.trim(),
          bookDescription: bookDescInp.value.trim(),
          bookType: document
            .querySelector('input[name="bookType"]:checked')
            .value.toLowerCase(),
          bookCategory: selectInput.disabled
            ? newCategory.value.trim()[0].toUpperCase() +
              newCategory.value.trim().slice(1).toLowerCase()
            : selectInput.value,
          bookAddedTime: Date.now(),
        });

        bookFomrSubmitBtn.value = "Add";

        checkCategories(
          selectInput.disabled
            ? newCategory.value.trim()[0].toUpperCase() +
                newCategory.value.trim().slice(1).toLowerCase()
            : selectInput.value
        );

        clearInputs();

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        clearInputs();
        Swal.fire("Changes are not saved", "", "info");
      }
    });
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
    bookNameAboutInp.value.trim() &&
    bookUrlAboutInp.value.trim() &&
    bookDescAboutInp.value.trim()
  ) {
    const currentAboutData = {
      title: bookNameAboutInp.value.trim(),
      imageUrl: bookUrlAboutInp.value.trim(),
      description: bookDescAboutInp.value.trim(),
    };

    updateAboutStoreData(currentAboutData);

    bookNameAboutInp.value = "";
    bookUrlAboutInp.value = "";
    bookDescAboutInp.value = "";

    Swal.fire({
      icon: "success",
      title: "About Store updated successfully!",
    });
  }
});

// =========================> CREATE JOIN US TABLE <=========================

function createJoinUsTable(data) {
  data.forEach((element, index) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td1.textContent = index + 1;
    td2.textContent = element.fullName;
    td3.innerHTML = `<i class="fa-regular fa-envelope" style="color:#F44336"></i> <a style="color:#F44336; font-weight:bold" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${element.email}" target="_blank">${element.email}</a>`;

    tr.append(td1, td2, td3);

    joinUsTableBody.append(tr);
  });
}

// =========================> CREATE BOOKS TABLE <=========================

function createBooksTable(data) {
  data.forEach((element, index) => {
    const newRow = bookTableBodyTemplate.content.cloneNode(true).children[0];

    const id = newRow.querySelector(".booksTabelBodyId");

    const img = newRow.querySelector(".bookTableImg");
    const title = newRow.querySelector(".bookTableBodyTitle");

    const desc = newRow.querySelector(".bookTableBodyDesc");
    const category = newRow.querySelector(".bookTableBodyCategory");
    const author = newRow.querySelector(".bookTableBodyAuthor");

    const trashIcon = newRow.querySelector(".trashIcon");
    const editIcon = newRow.querySelector(".editIcon");

    id.textContent = index + 1;
    img.src = element[1].bookUrl;
    title.textContent = element[1].bookTitle;
    desc.textContent = element[1].bookDescription;
    category.textContent = element[1].bookCategory;
    author.textContent = element[1].bookAuthor;

    trashIcon.setAttribute("data-id", element[0]);
    editIcon.setAttribute("data-id", element[0]);

    trashIcon.addEventListener("click", () => {
      console.log(trashIcon.dataset.id);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          remove(ref(database, "books/" + trashIcon.dataset.id));
        }
      });
    });

    editIcon.addEventListener("click", () => {
      bookFomrSubmitBtn.value = "Update Book";

      onValue(ref(database, "books/" + editIcon.dataset.id), (snapshot) => {
        if (snapshot.exists()) {
          const editedBook = snapshot.val();
          console.log(editedBook);
          console.log(editIcon.dataset.id);

          bookNameInp.value = editedBook.bookTitle;
          authorNameInp.value = editedBook.bookAuthor;
          bookUrlInp.value = editedBook.bookUrl;
          bookDescInp.value = editedBook.bookDescription;
          publishedDateInp.value = editedBook.bookPublishedDate;

          bookNameInp.setAttribute("data-id", element[0]);

          selectInput.value = editedBook.bookCategory;

          document
            .querySelectorAll('input[name="bookType"]')
            .forEach((input) => {
              input.value.toLowerCase() == editedBook.bookType &&
                (input.checked = true);
            });
        } else console.log("no edit books");
      });
    });

    booksTableBody.append(newRow);
  });
}

// =========================> CREATE CONTACT TABLE <=========================

function createContactUsTable(data) {
  data.forEach((element, index) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");

    td1.textContent = index + 1;
    td2.textContent = element.fullName;
    td3.textContent = element.address;

    td4.innerHTML = `<i class="fa-regular fa-envelope" style="color:#F44336"></i> <a style="color:#F44336; font-weight:bold" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${element.email}" target="_blank">${element.email}</a>`;
    td5.innerHTML = `<i class="fa-brands fa-whatsapp" style="color:#25D366"></i> <a style="color:#25D366; font-weight:bold" href="https://wa.me/+994${element.phoneNumber}?text=Salam%20hörmətli%20oxucu,%20Library%20TEAM-TU%20komandası%207/24%20sizin%20xidmətinizdədir.%20Hər%20hansı%20bir%20sualınız,%20iradınız%20və%20ya%20təklifiniz%20varsa,%20bizimlə%20əlaqə%20saxlamağınızı%20xahiş%20edirik.%20Xoş%20günlər%20!!!%20LIBRARY%20TEAM-TU" target="_blank">${element.phoneNumber}</a>`;
    td6.textContent = element.note;

    tr.append(td1, td2, td3, td4, td5, td6);

    contactUsTableBody.append(tr);
  });
}

// =================================> RESPONSIVE JS <===================================

mobileHamburger.addEventListener("click", () => {
  document.querySelector(".adminAside").classList.add("showAside");
});

closeBtnAside.addEventListener("click", () => {
  document.querySelector(".adminAside").classList.remove("showAside");
});
