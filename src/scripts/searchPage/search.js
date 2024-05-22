const cardTemp = document.querySelector(".cardTemp");
const searchBtn = document.querySelector(".searchBtn");
const searchInp = document.querySelector(".searchInp");
const cont = document.querySelector(".cont");
const loading = document.querySelector(".loading");
const libraryImg = document.querySelector(".libraryImg");

// =================================> IMPORT FIREBASE <===================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  get,
  child,
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

// ==================================> FECTH BOOKS <===================================

function fetchBooks(word) {
  get(child(ref(database), "books")).then((snapshot) => {
    if (snapshot.exists()) {
      const books = Object.entries(snapshot.val());

      displayData(books, word);
    } else console.log("no books");
  });
}

// ==================================> DISPLAY BOOKS <===================================

function displayData(data, word) {
  const filteredArray = data.filter((book) =>
    book[1].bookTitle.toLowerCase().includes(word.toLowerCase())
  );

  if (filteredArray.length > 0) {
    filteredArray.forEach((element) => {
      const card = cardTemp.content.cloneNode(true).children[0];

      const h1 = card.querySelector(".cardTitle");
      const p1 = card.querySelector(".cardAuthor");
      const p2 = card.querySelector(".cardDesc");
      const img = card.querySelector("img");
      const link = card.querySelector("a");

      h1.textContent = element[1].bookTitle;
      p1.textContent = element[1].bookAuthor;
      p2.textContent = element[1].bookDescription;
      img.src = element[1].bookUrl;
      link.href = "/library/src/pages/aboutBook.html?id=" + element[0];

      cont.append(card);
    });
  } else {
    libraryImg.classList.remove("hide");
  }

  loading.classList.add("hide");
}

// ==================================> SEARCH BOOKS <===================================

searchBtn.addEventListener("click", () => {
  if (searchInp.value.trim()) {
    loading.classList.remove("hide");
    libraryImg.classList.add("hide");
    cont.innerHTML = "";
    fetchBooks(searchInp.value);
  }
});

searchInp.addEventListener("keyup", (e) => {
  e.code == "Enter" && searchBtn.click();
});

// ==================================> DOM ASSIGMENTS <===================================

const hamburger = document.querySelector(".iconH");
const navMenu = document.querySelector(".navMenu");
const closeBtn = document.querySelector(".closeBtn");

const joinUsModalArea = document.querySelector(".joinUsModalArea");
const joinUs = document.querySelector(".joinUs");
const joinUsModalBtn = document.querySelector(".joinUsModalBtn");
const alertModal = document.querySelector(".alertModal");
const inputName = document.querySelector(".inputName");
const inputEmail = document.querySelector(".inputEmail");

const joinerName = document.querySelector(".joinerName");

document.querySelector(".logoImg").addEventListener("click", () => {
  window.location.href = "/library/index.html";
});

// ==================================> SHOW HIDE MENU <===================================

hamburger.addEventListener("click", () => {
  navMenu.classList.add("showNavMenu");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("showNavMenu");
});

// ==================================> OPEN JOIN US MODAL <===================================

joinUs.addEventListener("click", (e) => {
  if (e.target.classList[0] === "joinUsIcon") {
    joinUsModalArea.classList.add("showModalArea");
    joinUsModalArea.children[0].classList.add("showModal");
  }
});

// ==================================> CLOSE JOIN US MODAL <===================================

joinUsModalArea.addEventListener("click", (e) => {
  if (e.target.classList[0] === "joinUsModalArea") {
    joinUsModalArea.classList.remove("showModalArea");
    joinUsModalArea.children[0].classList.remove("showModal");
  }
});

// ==================================> SHOW JOINER NAME <===================================

(() => {
  if (localStorage.getItem("joinerName"))
    joinerName.textContent = localStorage.getItem("joinerName");
  else joinerName.textContent = "Join Us";
})();

// ==================================> SHOW MODAL ALERT <===================================

const alertMessageType = (type) => {
  switch (type) {
    case "success":
      {
        sendJoinerInfoToDb();

        alertModal.classList.add("showSuccessAlert");
        alertModal.children[0].textContent = `Thank you ${inputName.value.trim()}, for joining us!`;

        alertModal.classList.add("showAlertModal");

        setTimeout(() => {
          alertModal.classList.remove("showSuccessAlert");
          alertModal.children[0].textContent = `Please fill in all fields, or enter a valid email`;
          alertModal.classList.remove("showAlertModal");

          localStorage.setItem("joinerName", inputName.value.trim());

          joinerName.textContent = localStorage.getItem("joinerName");

          inputName.value = "";
          inputEmail.value = "";

          joinUsModalArea.classList.remove("showModalArea");
          joinUsModalArea.children[0].classList.remove("showModal");
        }, 1200);
      }
      break;
    case "error":
      {
        alertModal.classList.add("showAlertModal");
        setTimeout(() => {
          alertModal.classList.remove("showAlertModal");
        }, 1000);
      }
      break;
  }
};

joinUsModalBtn.addEventListener("click", () => {
  if (
    inputName.value.trim() &&
    inputEmail.value.trim() &&
    inputEmail.value.includes("@")
  )
    alertMessageType("success");
  else alertMessageType("error");
});

// ==================================> SEND JOINER INFO TO DB <===================================

const sendJoinerInfoToDb = () => {
  const joinerInfo = {
    fullName: inputName.value.trim(),
    email: inputEmail.value.trim(),
  };
  push(ref(database, "joiners"), joinerInfo);
};

// ==================================> ========================================================================== <===================================

let swiperCard = new Swiper(".swiper", {
  spaceBetween: 30,
  grabCursor: true,
  speed: 800,
  slidesPerView: 1,

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    waitForTransition: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
