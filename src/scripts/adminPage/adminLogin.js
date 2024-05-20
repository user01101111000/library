import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4Sb2LCfKwA3GW4R3VM9L34pTVqh6xnAY",
  authDomain: "library-7fefd.firebaseapp.com",
  projectId: "library-7fefd",
  storageBucket: "library-7fefd.appspot.com",
  messagingSenderId: "1078426865027",
  appId: "1:1078426865027:web:47c0a65064eb5cd0493ab6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==================================> ADMIN LOGIN FIREABSE <===================================

const inputEmail = document.querySelector(".inputEmail");
const inputPassword = document.querySelector(".inputPassword");
const loginBtn = document.querySelector(".loginBtn");

function clearInputs() {
  inputEmail.value = "";
  inputPassword.value = "";
}

function checkLogin(data) {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      Swal.fire({
        title: "SUCCESS!",
        text: "You have successfully logged in!",
        icon: "success",
      }).then(() => {
        localStorage.setItem("loggedIn", true);
        window.location.href = "/library/src/pages/admin.html";
      });

      clearInputs();
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });

      clearInputs();
    });
}

loginBtn.addEventListener("click", () => {
  if (inputEmail.value && inputPassword.value)
    checkLogin({
      email: inputEmail.value,
      password: inputPassword.value,
    });
});
