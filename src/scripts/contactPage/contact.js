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

// ==================================> SHOW MODAL ALERT <===================================

const alertMessageType = (type) => {
  switch (type) {
    case "success":
      {
        sendJoinerInfoToDb();

        alertModal.classList.add("showSuccessAlert");
        alertModal.children[0].textContent = `Thank you ${inputName.value}, for joining us!`;

        alertModal.classList.add("showAlertModal");

        setTimeout(() => {
          alertModal.classList.remove("showSuccessAlert");
          alertModal.children[0].textContent = `Please fill in all fields, or enter a valid email`;
          alertModal.classList.remove("showAlertModal");

          localStorage.setItem("joinerName", inputName.value);

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
  if (inputName.value && inputEmail.value && inputEmail.value.includes("@"))
    alertMessageType("success");
  else alertMessageType("error");
});

// ==================================> SHOW JOINER NAME <===================================

(function () {
  if (localStorage.getItem("joinerName")) {
    joinerName.textContent = localStorage.getItem("joinerName");
  } else {
    joinerName.textContent = "Join Us";
  }
})();

// ==================================> SEND JOINER INFO TO DB <===================================

const sendJoinerInfoToDb = () => {
  const joinerInfo = {
    name: inputName.value,
    email: inputEmail.value,
  };
  console.log(joinerInfo);
};

// ==================================> Inputs value <=================================== //

const sendButton = document.querySelector(".send-button");
const contactEmail = document.getElementById("input-email");
const phoneInput = document.getElementById("phone-input");
const modal = document.getElementById("myModal");
const modal2 = document.getElementById("myModal-2");
const modal3 = document.getElementById("myModal-3");

sendButton.addEventListener("click", () => {
  const inputRows = document.querySelectorAll(".input-large, .input-note"); 
  let isEmpty = false;
  let emailIsValid = true;
  let phoneIsValid = true;

  inputRows.forEach(inputRow => {
    const fieldName = inputRow.getAttribute("placeholder");

    if (!inputRow.value.trim()) {
      isEmpty = true;
      modal3.style.display = "block";
      inputRow.style.borderColor = "red";
      setTimeout(() => {
        modal3.style.display = "none";
      }, 1000);
    } else {
      inputRow.style.borderColor = "green";
      setTimeout(() => {
        inputRow.style.borderColor = "#ccc";
      }, 1000);
    }

    if (inputRow === contactEmail) {
      if (!inputRow.value.includes('@')) {
        emailIsValid = false;
        modal.style.display = "block"; 
        modal2.style.display = "none"; 
        inputRow.style.borderColor = "red";
      }
      setTimeout(() => {
        modal.style.display = "none";
      }, 1000);
    }

    if (inputRow === phoneInput) {
      if (!(/^\+?\d+$/.test(inputRow.value)) || !(/^\+/.test(inputRow.value))) {
        phoneIsValid = false;
        modal2.style.display = "block"; 
        modal.style.display = "none"; 
        inputRow.style.borderColor = "red";
      }
      setTimeout(() => {
        modal2.style.display = "none";
      }, 1000);
    }

    inputRow.addEventListener("input", () => {
      if (inputRow.value.trim()) {
        inputRow.style.borderColor = "#ccc";
      }
    });

   
  });

  if (isEmpty || !emailIsValid || !phoneIsValid) {
    if (emailIsValid && !phoneIsValid) {
      modal2.style.display = "block";
    } else if (!emailIsValid && phoneIsValid) {
      modal.style.display = "block";
    } else {
      modal3.style.display = "block";
    }
    setTimeout(() => {
      modal2.style.display = "none";
      modal.style.display = "none";
      modal3.style.display = "none";
    }, 1000);
  } else {
    const newData = {};
    inputRows.forEach(inputRow => {
      const fieldName = inputRow.getAttribute("placeholder");
      newData[fieldName] = inputRow.value;
    });
    console.log(newData);

    inputRows.forEach(inputRow => {
      inputRow.value = "";
    });
  }
});





















// ==================================> Inputs value <===================================//
// _________________________________________________________________________________________//











