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

const hamburger = document.querySelector(".iconH");
const navMenu = document.querySelector(".navMenu");
const closeBtn = document.querySelector(".closeBtn");

const joinUsModalArea = document.querySelector(".joinUsModalArea");
const joinUs = document.querySelector(".joinUs");
const joinUsModalBtn = document.querySelector(".joinUsModalBtn");
const alertModal = document.querySelector(".alertModal");
const inputName = document.querySelector(".inputName");
const inputEmail = document.querySelector(".inputEmail");

const catalogBoxesArea = document.querySelector(".catalogBoxesArea");
const catalogBoxTemplate = document.querySelector(".catalogBoxTemplate");
const loading = document.querySelector(".loading");

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


const pushDataToDB = (data) => {
  push(ref(database, "contact"), data)
}
// ==================================> Inputs value <=================================== //

const sendButton = document.querySelector(".send-button");
const contactEmail = document.getElementById("input-email");
const phoneInput = document.getElementById("phone-input");

sendButton.addEventListener("click", () => {
  const inputRows = document.querySelectorAll(".input-large, .input-note");
  let isEmpty = false;
  let emailIsValid = true;
  let phoneIsValid = true;

  inputRows.forEach(inputRow => {
    if (!inputRow.value.trim() && inputRow.classList.contains('input-large')) {
      isEmpty = true;
      inputRow.style.borderColor = "red";
    } else {
      inputRow.style.borderColor = "green";
    }

    if (inputRow.classList.contains('input-note') && !inputRow.value.trim()) {
      inputRow.style.borderColor = "red";
    }

    if (inputRow === contactEmail) {
      if (!inputRow.value.includes('@')) {
        emailIsValid = false;
        inputRow.style.borderColor = "red";
      } else if (inputRow.value.trim()) {
        inputRow.style.borderColor = "green";
      }
    }

    if (inputRow === phoneInput) {
      if (!(/^\d+$/.test(inputRow.value))) {
        phoneIsValid = false;
        inputRow.style.borderColor = "red";
      }
    }

    inputRow.addEventListener("input", () => {
      if (inputRow.value.trim() || inputRow.classList.contains('input-note')) {
        inputRow.style.borderColor = "#ccc";
      }
    });
  });

  if (isEmpty || !emailIsValid || !phoneIsValid) {
    if (!emailIsValid) {
      Swal.fire({
        icon: "error",
        title: "Attention...",
        text: "Please enter a valid email!",
      });
    }

    if (!phoneIsValid) {
      Swal.fire({
        icon: "error",
        title: "Attention...",
        text: "Please enter a valid number!"
      });
    }

    if (isEmpty) {
      Swal.fire({
        icon: "error",
        title: "Attention...",
        text: "Please fill in the information!",
      });
    }

  } else {
    const fieldNames = ["fullName", "email", "address", "phoneNumber", "note"]
    const newData = {};
    inputRows.forEach((inputRow, i) => {
      if (inputRow.classList.contains("input-note") && !inputRow.value) newData[fieldNames[i]] = "No note"
      else newData[fieldNames[i]] = inputRow.value
    });
    console.log(newData);
    pushDataToDB(newData)

    inputRows.forEach(inputRow => {
      inputRow.style.borderColor = "green";
      inputRow.value = "";
      setTimeout(() => {
        inputRow.style.borderColor = "#ccc";
      }, "1000");
    });

    Swal.fire({
      title: "Thank you!",
      icon: "success",
    });
  }
});





























// ==================================> Inputs value <===================================//
// _________________________________________________________________________________________//











