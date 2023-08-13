const LAMBDA_URL = "https://qs9zaxu0jb.execute-api.us-east-2.amazonaws.com/default/needhamswivetimessearch";

let formElement;
let errorMessageElement;

document.addEventListener("DOMContentLoaded", function(){
  formElement = document.getElementById("form");
  errorMessageElement = document.getElementById("error-message");
});

function search() {
  getData(formElement);
  fetch(LAMBDA_URL)
    .then(response => {
      if (response.status === 400) {
        response.text().then(text => handleError(text));
      }
    });
}

function getData(form) {
  const formData = new FormData(form);

  for (const pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  console.log(Object.fromEntries(formData));
}

function handleError(text) {
  errorMessageElement.style.display = null;
  errorMessageElement.innerHTML = text;
}
