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

const joinerName = document.querySelector(".joinerName");
const loading = document.querySelector(".loading")



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

// =================================================================> YOUR CODE <==============================================================================

// Relate back button to catalog page
const backBtn = document.querySelector(".backBtn")
backBtn.addEventListener('click', function () {
  window.location.href = '/library/src/pages/catalog.html'
})


const bookYear = document.querySelector("#bookYear")
const bookName = document.querySelector(".bookName")
const addedDay = document.querySelector(".addedDay")
const authorName = document.querySelector(".authorName")
const bookInfo = document.querySelector(".bookInfo")
const newSign = document.querySelector(".newSign")
const aboutBookImg = document.querySelector(".aboutBookImg")
const sendIcon = document.querySelector(".sendIcon")
const anonimInput = document.querySelector(".anonimInput")
const commentAnonymous = document.querySelector(".commentAnonymous")
const commentTemp = document.querySelector(".commentTemp")
const id = window.location.href.split("=")[1]




onValue(ref(database, "books/" + id), (snapshot) => {
  if (snapshot.exists()) {

    const data = snapshot.val();

    bookYear.textContent = data.bookPublishedDate == "Unknown" ? "Unknown" : data.bookPublishedDate.slice(0, 4);
    bookName.textContent = data.bookTitle;
    bookInfo.textContent = data.bookDescription

    const diff = Math.ceil((Date.now() - data.bookAddedTime) / (1000 * 3600 * 24)) - 1;


    if (diff == 0) addedDay.textContent = "Today"
    else addedDay.textContent = `${diff} days ago`


    authorName.textContent = data.bookAuthor
    aboutBookImg.src = data.bookUrl

    if (data.bookType == "bestseller") newSign.style.display = "none"




    loading.classList.add("hideLaoding")

    document.querySelector("main").style.visibility = "visible"




  } else console.log("no data")
})



// CREATE COMMENT BOX

function createCommentBox(data) {
  const commentBox = commentTemp.content.cloneNode(true).children[0];

  const time = commentBox.querySelector(".time")
  const comment = commentBox.querySelector(".comment");
  const h4 = commentBox.querySelector("h4")

  const diff = Math.ceil((Date.now() - data.commentDate) / (1000 * 3600 * 24)) - 1;



  console.log(diff);


  if (diff) time.textContent = diff + " days ago";
  else {
    const date = new Date(data.commentDate)

    time.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Today`
  }


  comment.textContent = data.comment
  h4.textContent = data.commentName


  return commentBox;
}



sendIcon.addEventListener("click", () => {
  if (anonimInput.value) {

    const commentData = {
      commentDate: Date.now(),
      commentName: "anonym",
      comment: anonimInput.value
    }

    sendCommentDataToDB(commentData)

    anonimInput.value = "";
  }
})



// SEND COMMENT DATA TO DB

function sendCommentDataToDB(data) {
  push(ref(database, "books/" + id + "/bookComments"), data)
}


onValue(ref(database, "books/" + id + "/bookComments"), (snapshot) => {
  commentAnonymous.innerHTML = ""
  if (snapshot.exists()) {
    const comments = Object.values(snapshot.val());

    comments.forEach(comment => {
      commentAnonymous.prepend(createCommentBox(comment))

    })

  }


})