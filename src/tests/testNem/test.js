document.getElementById('sweetalert').addEventListener('click', () => {
            
Swal.fire({
icon: "error",
title: "Oops...",
text: "Something went wrong!",
});
})



sendButton.addEventListener("click", () => {
    const inputRows = document.querySelectorAll(".input-large, .input-note");
    let isEmpty = false;
    let emailIsValid = true;
    let phoneIsValid = true;
  
    inputRows.forEach(inputRow => {
      if (!inputRow.value.trim()) {
        isEmpty = true;
        inputRow.style.borderColor = "red";
      } else {
        inputRow.style.borderColor = "green";
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
        if (!(/^\+?\d{9,}$/.test(inputRow.value))) {
          phoneIsValid = false;
          inputRow.style.borderColor = "red";
        } else if (inputRow.value.trim()) {
          inputRow.style.borderColor = "green";
        }
      }
  
      inputRow.addEventListener("input", () => {
        if (inputRow.value.trim()) {
          inputRow.style.borderColor = "#ccc";
        }
      });
    });
  
    if (isEmpty || !emailIsValid || !phoneIsValid) {
      if (!emailIsValid) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email!",
        });
      }
  
      if (!phoneIsValid) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid number!"
        });
      }
  
      if (isEmpty) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in the information!",
        });
      }
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
  
      Swal.fire({
        title: "Thank you!",
        icon: "success",
      });
    }
  });
  