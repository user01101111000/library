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



// ===================================================================================================

// ===================  SWIPER JS ==============================
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'


let card__content1 = new Swiper('.card__content1', {
   loop: true,
   spaceBetween: 32,
   grabCursor: true,
  
  navigation: {
    nextEl: '.swiper-button-next1',
    prevEl: '.swiper-button-prev1',
  },


  breakpoints: {
      1440: {
        slidesPerView: 5,
      },
      1000: {
        slidesPerView: 4,
      },
      900: {
        slidesPerView: 3
      },
      600: {
        slidesPerView: 2,
      },
     
      540: {
        slidesPerView: 1,
      },
      400: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      }
      
  },
});



let swiper2 = new Swiper('.swiper2', {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,
 
 navigation: {
   nextEl: '.swiper-button-next2',
   prevEl: '.swiper-button-prev2',
 },


 breakpoints: {
     1440: {
       slidesPerView: 5,
     },
     1020: {
       slidesPerView: 4,
     },
     900: {
       slidesPerView: 3
     },
     600: {
       slidesPerView: 2,
     },
     
     540: {
      slidesPerView: 1,
    },
    
     400: {
       slidesPerView: 1,
     },
     320: {
       slidesPerView: 1,
     }
     
 },
});


let card__content3 = new Swiper('.card__content3', {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,
 
 navigation: {
   nextEl: '.swiper-button-next3',
   prevEl: '.swiper-button-prev3',
 },


 breakpoints: {
     1440: {
       slidesPerView: 5,
     },
     1000: {
       slidesPerView: 4,
     },
     900: {
       slidesPerView: 3
     },
    
     600: {
       slidesPerView: 2,
     },
     
     540: {
      slidesPerView: 2,
    },
    
     400: {
       slidesPerView: 1,
     },
     320: {
       slidesPerView: 1,
     }
     
 },
});



// ============================Read More Button Click Function


// const readMoreButton = document.querySelector('.read-more');


// readMoreButton.addEventListener('click', function() {

//   const catalogHtml = document.querySelector('.hidden-html');
//   const bookHtml = document.querySelector('.visible-html');

//   catalogHtml.style.display ='none'
//   bookHtml.style.displa = 'block'

// })