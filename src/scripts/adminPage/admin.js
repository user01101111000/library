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

// ==================================> CHECK LOGGED IN <===================================

(function () {
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
  if (userName.value === "admin" && inputPassword.value === "admin") {
    alert("Login Successfully");
    localStorage.setItem("loggedIn", true);

    loginMain.style.display = "none";
    adminMain.style.display = "flex";
  } else alert("Login Failed");
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
    "https://m.media-amazon.com/images/I/81G8e+64W8L._AC_UF894,1000_QL80_.jpg";
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
    h1.style.paddingBottom = "1em";
    results.append(h1);
    searchIcon.style.opacity = 1;
    loading.classList.add("hideLoading");
  }
};

// =========> LIST ITEM CLICKED <=========

const listItemClicked = (currentItem, element) => {
  currentItem.addEventListener("click", () => {
    !element.volumeInfo.imageLinks?.smallThumbnail &&
      (element["currentImg"] =
        "https://m.media-amazon.com/images/I/81G8e+64W8L._AC_UF894,1000_QL80_.jpg");

    bookNameInp.value = element.volumeInfo.title;
    authorNameInp.value =
      element.volumeInfo.authors?.join(", ") ?? "Unknown author";
    bookUrlInp.value =
      element.volumeInfo.imageLinks?.thumbnail ?? element["currentImg"];
    bookDescInp.value = element.volumeInfo.description ?? "No Description";

    results.innerHTML = "";
    searchInput.value = "";
  });
};

// =========> INPUT AND BUTTON LISTENERS <=========

searchBtn.addEventListener("click", (e) => {
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

document.body.addEventListener("click", (e) => {
  results.innerHTML = "";
});

// =================================> ADD BOOK TO FORM <===================================

bookFomrSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    bookNameInp.value.trim() != "" &&
    authorNameInp.value.trim() != "" &&
    bookUrlInp.value.trim() != "" &&
    bookDescInp.value.trim() != ""
  ) {
    const currentBook = {
      bookTitle: bookNameInp.value.trim(),
      bookAuthor: authorNameInp.value.trim(),
      bookUrl: bookUrlInp.value.trim(),
      bookDescription: bookDescInp.value.trim(),
      bookType: document.querySelector('input[name="bookType"]:checked').value,
      bookCategory: selectInput.disabled
        ? newCategory.value.trim()
        : selectInput.value,
      bookAddedTime: Date.now(),
    };

    console.log(currentBook);

    let date1 = new Date("05/09/2024");

    let diff = Math.round(
      (1715421597974 - date1.getTime()) / (1000 * 3600 * 24)
    );

    console.log(diff);

    newCategory.value = "";
    bookNameInp.value = "";
    authorNameInp.value = "";
    bookUrlInp.value = "";
    bookDescInp.value = "";
    selectInput.removeAttribute("disabled");
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
    bookNameAboutInp.value.trim() != "" &&
    bookUrlAboutInp.value.trim() != "" &&
    bookDescAboutInp.value.trim() != ""
  ) {
    const currentAboutData = {
      bookTitle: bookNameAboutInp.value.trim(),
      bookUrl: bookUrlAboutInp.value.trim(),
      bookDescription: bookDescAboutInp.value.trim(),
    };

    console.log(currentAboutData);

    bookNameAboutInp.value = "";
    bookUrlAboutInp.value = "";
    bookDescAboutInp.value = "";
  }
});

// =================================> DYNAMIC OPTIONS <===================================

const categories = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];

fetchOptions(categories);

function fetchOptions(data) {
  data.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element;
    option.value = element;

    bookCategoryInp.append(option);
  });
}

// =================================> DYNAMIC TABLES <===================================

const joinUsFormDatas = [
  { fullName: "ares", email: "ares@gmail.com" },
  { fullName: "odin", email: "odin@gmail.com" },
  { fullName: "thor", email: "thor@gmail.com" },
  { fullName: "freya", email: "freya@gmail.com" },
];

createJoinUsTable(joinUsFormDatas);

function createJoinUsTable(data) {
  data.forEach((element, index) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td1.textContent = index + 1;
    td2.textContent = element.fullName;
    td3.textContent = element.email;

    tr.append(td1, td2, td3);

    joinUsTableBody.append(tr);
  });
}

const booksFormDatas = [
  {
    bookAuthor: "Nea Anna Simone",
    bookCategory: "Action",
    bookDescription:
      'Are You Ready to Say "YES" to Yourself? "Finding Y.E.S.: Your Essential Self" is more than a book; it\'s an invitation to a life-changing adventure. Open its pages and let Nea Anna Simone\'s words ignite the flame within you. Say "YES" to your Essential Self, and embark on a transformative journey toward a life filled with purpose, passion, and boundless joy. In the hustle and bustle of our daily lives, we often find ourselves caught in a whirlwind of obligations and expectations, losing sight of the one person who truly matters the person staring back at us in the mirror. Renowned New York Times bestselling author Nea Anna Simone brings you a dose of inspiration and self-discovery in "Finding Y.E.S.: Your Essential Self." "Finding Y.E.S." is not just a book; it\'s your companion on the road to self-discovery to inspire you to cultivate self-love, pursue your passions, and navigate life with renewed clarity. Allow these pages to be the mirror reflecting the brilliance of Your Essential Self. Nea Anna Simone, a New York Times bestselling author, is celebrated for her ability to illuminate the human spirit. Through her writing, she has touched hearts and transformed lives worldwide. Her authenticity and compassion shine through, making her the perfect guide on your journey to rediscover your Essential Self.',
    bookTitle: "Finding Y.E.S.",
    bookUrl:
      "http://books.google.com/books/content?id=Z4fwEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookAuthor: "İsmail Tunalı",
    bookCategory: "Action",
    bookDescription:
      "Kim demiş felsefe anlaşılmaz diye! İsmail Tunalı’nın birçok dile çevrilen Felsefeye Giriş kitabı, uzun soluklu bir birikimin ve yalın üslubun bireşiminin ürünüdür. İsmail Tunalı, siyaset, bilim, ahlak, sanat ve din felsefesinin temel problemlerini ve felsefe tarihine yön veren filozofların görüşlerini, örnek okuma metinleri eşliğinde ele almaktadır. Elinizdeki kitap, felsefe akımlarını kavramak isteyen gençler, yeni başlayanlar ve hafıza tazelemek isteyenler için hazırlandı.",
    bookTitle: "Felsefeye Giriş",
    bookUrl:
      "http://books.google.com/books/content?id=LXdgEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  {
    bookAuthor: "Hakan Ertuğral",
    bookCategory: "Action",
    bookDescription:
      "Generally, outside of the academic word, nomads are not considered as the part of the civilization process. Most of the times, due to the Eurocentric thoughts that were developed in the 19th century, scientific and technological improvements of the humanity were considered unique to Europe. Therefore, other people that were conquered by European armies were thought that they were completely out of the civilization process and the lived as ‘barbarians’ because they did not live or think like Europeans. According to this view, if they will civilize or they can be considered as ‘developed nation’, they had to live like Europeans, at least, they had to have same cultural attitudes or they must mimic. This bias made hard to understand how other cultures lived and what they developed in their material culture. However, during the 20th century, this linear and positivist understanding of history have been changed. In this book, first of all intellectual process on scientific progress was evaluated and then, the place where the Turks could be placed in this progress was examined.",
    bookTitle: "History Of Chemistry in Ancient Turks (Yeditepe Yayınevi)",
    bookUrl:
      "http://books.google.com/books/content?id=0MrfEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
];

createBooksTable(booksFormDatas);

function createBooksTable(data) {
  data.forEach((element, index) => {
    const newRow = bookTableBodyTemplate.content.cloneNode(true).children[0];

    const id = newRow.querySelector(".booksTabelBodyId");

    const img = newRow.querySelector(".bookTableImg");
    const title = newRow.querySelector(".bookTableBodyTitle");

    const desc = newRow.querySelector(".bookTableBodyDesc");
    const category = newRow.querySelector(".bookTableBodyCategory");
    const author = newRow.querySelector(".bookTableBodyAuthor");

    id.textContent = index + 1;
    img.src = element.bookUrl;
    title.textContent = element.bookTitle;
    desc.textContent = element.bookDescription;
    category.textContent = element.bookCategory;
    author.textContent = element.bookAuthor;

    booksTableBody.append(newRow);
  });
}

const contactUsTableDatas = [
  {
    fullName: "ares",
    address: "Neftciler Birlesmis Statlari, aza vilayeti",
    emailAddress: "ares@gmail.com",
    phoneNumber: "(055)-070-1222-34-12",
  },
  {
    fullName: "odin",
    address: "Azadliq Birlesmis Statlari, ers vilayeti",
    emailAddress: "odin@gmail.com",
    phoneNumber: "(055)-070-3424-12-11",
  },
  {
    fullName: "thor",
    address: "Nizami Birlesmis Statlari, ter vilayeti",
    emailAddress: "thor@gmail.com",
    phoneNumber: "(055)-070-4322-12-77",
  },
];

createContactUsTable(contactUsTableDatas);

function createContactUsTable(data) {
  data.forEach((element, index) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");

    td1.textContent = index + 1;
    td2.textContent = element.fullName;
    td3.textContent = element.address;
    td4.textContent = element.emailAddress;
    td5.textContent = element.phoneNumber;

    tr.append(td1, td2, td3, td4, td5);

    contactUsTableBody.append(tr);
  });
}

// ===============================> DELETE ELEMENT FROM BOOK TABLE <===================================

booksTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("trashIcon")) {
    console.log("book deleted : ", e.target.closest(".bookTableRow"));
  }
});

// =================================> RESPONSIVE JS <===================================

mobileHamburger.addEventListener("click", () => {
  document.querySelector(".adminAside").classList.add("showAside");
});

closeBtnAside.addEventListener("click", () => {
  document.querySelector(".adminAside").classList.remove("showAside");
});
