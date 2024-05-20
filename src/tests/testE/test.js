const emailInp = document.querySelector(".emailInp");
const passwordInp = document.querySelector(".passwordInp");
const send = document.querySelector(".send");
const pathInp = document.querySelector(".pathInp");
const read = document.querySelector(".read");
const updateBtn = document.querySelector(".updateBtn");
const removeBtn = document.querySelector(".removeBtn");
const myList = document.querySelector(".myList");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAczCO6ZHNMc3xGIjS0Dq6ENCPsaSNT2cQ",
  authDomain: "form-9347e.firebaseapp.com",
  databaseURL: "https://form-9347e-default-rtdb.firebaseio.com",
  projectId: "form-9347e",
  storageBucket: "form-9347e.appspot.com",
  messagingSenderId: "885852797455",
  appId: "1:885852797455:web:0a4138aad58b84c211817a",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function clearInputs() {
  emailInp.value = "";
  passwordInp.value = "";
  pathInp.value = "";
}

// ---------------------------------------------------------

send.addEventListener("click", () => {
  const email = emailInp.value;
  const password = passwordInp.value;

  push(ref(db, "users"), { email, password });

  clearInputs();
});

onValue(ref(db, "users"), (snp) => {
  myList.innerHTML = "";
  if (snp.exists()) {
    const data = Object.entries(snp.val());

    data.forEach((user) => {


      const li = document.createElement("li");
      li.textContent = `email : ${user[1].email} password : ${user[1].password}`;

      li.addEventListener("click", () => {

        pathInp.setAttribute("data-id", user[0]);

        
        emailInp.value = user[1].email;
        passwordInp.value = user[1].password;
      });

      myList.append(li);



    });


  } else console.log("no data");
});

updateBtn.addEventListener("click", () => {
  update(ref(db, "users/" + pathInp.dataset.id), {
    email: emailInp.value,
    password: passwordInp.value,
  });
});
