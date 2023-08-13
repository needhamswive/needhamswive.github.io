const LAMBDA_BASE_URL = "https://qs9zaxu0jb.execute-api.us-east-2.amazonaws.com/default/needhamswivetimessearch";

let formElement;
let formSelectElement;
let errorMessageElement;

document.addEventListener("DOMContentLoaded", function(){
  formElement = document.getElementById("form");
  formSelectElement = document.getElementById("times-to-show");
  errorMessageElement = document.getElementById("error-message");
});

function search() {
  const formData = getData(formElement);
  const validationErrors = validateData(formData);

  if (validationErrors.length !== 0) {
    handleError(validationErrors[0]);
    return;
  }

  const requestUrl = buildUrl(LAMBDA_BASE_URL, formData);
  fetch(requestUrl)
    .then(response => {
      if (errorCategory(response.status) === 4) {
        response.text().then(text => handleError(text));
      }
      if (errorCategory(response.status) == 5) {
        handleError("Internal server error")
      }
    });
}

function buildUrl(base, queryStringParameters) {
  return `${base}?${Object.keys(queryStringParameters).map((key, _) => `${encodeURIComponent(key)}=${encodeURIComponent(queryStringParameters[key])}`).join("&")}`;
}

function errorCategory(statusCode) {
  return Math.floor(statusCode / 100);
}

function getData(form) {
  const formData = {};
  for (const pair of new FormData(form).entries()) {
    formData[pair[0]] = pair[1];
  }
  formData["timesToShow"] = formSelectElement.value;
  normalizeData(formData);
  return formData;
}

function normalizeData(formData) {
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value !== "string") continue;
    let normalizedValue = value.trim();
    normalizedValue = normalizedValue.replace(/\s\s+/g, " ");
    formData[key] = normalizedValue;
  }
}

function validateData(formData) {
  const validationErrors = [];

  if (formData.name === "") {
    validationErrors.push("Missing name");
  }
  if (formData.birthday === "") {
    validationErrors.push("Missing birthday");
  }
  if (!/^([0-9]{8})$/.test(formData.birthday)) {
    validationErrors.push("Birthday not formatted as MMDDYYYY");
  }

  return validationErrors;
}

function handleError(text) {
  errorMessageElement.style.display = null;
  errorMessageElement.innerHTML = text;
}
