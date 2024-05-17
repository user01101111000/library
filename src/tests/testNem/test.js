const input = document.querySelector("#phone");

// here, the index maps to the error code returned from getValidationError - see readme

// initialise plugin
const iti = window.intlTelInput(input, {
  initialCountry: "us",
  utilsScript: "/intl-tel-input/js/utils.js?1715508103106"
});

