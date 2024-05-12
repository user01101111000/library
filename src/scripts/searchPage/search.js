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



//.......................................................................................................................................................//


                                                                      // MY WORK AREA//
  
                                                                      
                                                          //........Slide Js.........//            
                                                                      
const swiperCard = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },

  speed: 800,
});



                                                                //............ MAIN  JS...........................//

 const inputSearch = document.querySelector("input");
const btnSearch = document.querySelector("button");
const slideArea = document.querySelector(".swiper-wrapper");
const swiper = document.querySelector('.swiper').swiper;

btnSearch.addEventListener("click", (event) => {
  const bookName = inputSearch.value.trim();
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}`;
  event.preventDefault();
  slideArea.innerHTML = ""; 
  if (bookName !== "") {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const items = data.items || [];
        if (items.length === 0) {
          slideArea.innerHTML = "<p>No results found.</p>";
        } else {
          items.forEach(item => {
            const title = item.volumeInfo.title || "Unknown Title";
            const authors = item.volumeInfo.authors || ["Unknown Author"];
            const description = item.volumeInfo.description || "No description available";
            const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150";
            const authorList = authors.map(author => `<h4 class="title_author">${author}</h4>`).join('');
            slideArea.innerHTML += `
                <div class="swiper-slide"> 
                  <div class="aboutBook">
                      <img class="bookImg" src="${thumbnail}" alt="${title}" />
                    <div class="headline">
                      <h2 class="title">${title}</h2>
                      <h3  class="title_author">  ${authorList}</h3>
                      <p class="paragraph">${description}</p>
                    </div>
                  </div>
                </div>
            `;
          });
          swiper.update(); 
        }
      })
      .catch(error => {
        console.error( error);
        slideArea.innerHTML = "<p>Failed to fetch data. Please try again later.</p>";
      });
  } else {
    console.log("Please enter a book name");
  }
});

                                                            
                                                                    
 


