const cardTemp = document.querySelector(".cardTemp");
const cont = document.querySelector(".cont");
const cont2 = document.querySelector(".cont2");
const cont3 = document.querySelector(".cont3");
const loading = document.querySelectorAll(".loading");

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

function hideLoadings() {
  loading.forEach((loading) => {
    loading.style.display = "none";
  });
}

// =================================> FECTH ALLBOOKS <===================================

(() => {
  cont.innerHTML = "";
  onValue(ref(database, "books"), (snapshot) => {
    if (snapshot.exists()) {
      const books = Object.entries(snapshot.val());

      displayAllBooks(books);
      hideLoadings();
      console.log(books);
    } else console.log("no books");
  });
})();

// =================================> FECTH BESTSELLER BOOKS <===================================

(() => {
  cont2.innerHTML = "";
  onValue(ref(database, "books"), (snapshot) => {
    if (snapshot.exists()) {
      const books = Object.entries(snapshot.val());
      const bestsellerBooks = books.filter(
        (book) => book[1].bookType === "bestseller"
      );

      displayBestsellerBooks(bestsellerBooks);
      hideLoadings();
      console.log(bestsellerBooks);
    } else console.log("no books");
  });
})();

// =================================> FECTH NEW BOOKS <===================================

(() => {
  cont3.innerHTML = "";
  onValue(ref(database, "books"), (snapshot) => {
    if (snapshot.exists()) {
      const books = Object.entries(snapshot.val());
      const newBooks = books.filter((book) => book[1].bookType === "new");
      displayNewBooks(newBooks);
      hideLoadings();
      console.log(newBooks);
    } else console.log("no books");
  });
})();

// =================================> DISPLAY ALL BOOKS <===================================

function displayAllBooks(data) {
  data.forEach((data) => {
    const card = cardTemp.content.cloneNode(true).children[0];

    const h1 = card.querySelector(".bookTitle");
    const p1 = card.querySelector(".bookAuthor");
    const img = card.querySelector("img");
    const newFlag = card.querySelector(".newFlag");
    const readMore = card.querySelector(".readMore");

    if (data[1].bookType === "bestseller") {
      newFlag.style.display = "none";
    }

    readMore.setAttribute("data-id", data[0]);

    readMore.addEventListener("click", (e) => {
      console.log(e.target.dataset.id);
    });

    h1.textContent = data[1].bookTitle;
    p1.textContent = data[1].bookAuthor;
    img.src = data[1].bookUrl;

    cont.append(card);
  });
}

// =================================> DISPLAY BESTSELLER BOOKS <===================================

function displayBestsellerBooks(data) {
  data.forEach((data) => {
    const card = cardTemp.content.cloneNode(true).children[0];

    const h1 = card.querySelector(".bookTitle");
    const p1 = card.querySelector(".bookAuthor");
    const img = card.querySelector("img");
    const newFlag = card.querySelector(".newFlag");
    const readMore = card.querySelector(".readMore");

    if (data[1].bookType === "bestseller") {
      newFlag.style.display = "none";
    }

    readMore.setAttribute("data-id", data[0]);

    readMore.addEventListener("click", (e) => {
      console.log(e.target.dataset.id);
    });

    h1.textContent = data[1].bookTitle;
    p1.textContent = data[1].bookAuthor;
    img.src = data[1].bookUrl;

    cont2.append(card);
  });
}

// =================================> DISPLAY NEW BOOKS <===================================

function displayNewBooks(data) {
  data.forEach((data) => {
    const card = cardTemp.content.cloneNode(true).children[0];

    const h1 = card.querySelector(".bookTitle");
    const p1 = card.querySelector(".bookAuthor");
    const img = card.querySelector("img");
    const readMore = card.querySelector(".readMore");

    readMore.setAttribute("data-id", data[0]);

    readMore.addEventListener("click", (e) => {
      console.log(e.target.dataset.id);
    });

    h1.textContent = data[1].bookTitle;
    p1.textContent = data[1].bookAuthor;
    img.src = data[1].bookUrl;

    cont3.append(card);
  });
}

// =======================================================================================================================

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

let swiperCards = new Swiper(".swiper", {
  spaceBetween: 30,
  grabCursor: true,
  speed: 800,
  slidesPerView: "auto",
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    waitForTransition: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    420: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },

    1000: {
      slidesPerView: 4,
    },

    1200: {
      slidesPerView: 5,
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
