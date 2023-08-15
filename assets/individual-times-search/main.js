const LAMBDA_BASE_URL = "https://qs9zaxu0jb.execute-api.us-east-2.amazonaws.com/default/needhamswivetimessearch";

const EVENTS = [
  "200 medley",
  "50 free",
  "50 free split",
  "100 free",
  "100 free split",
  "200 free",
  "500 free",
  "50 back split",
  "100 back",
  "50 breast split",
  "100 breast",
  "50 fly split",
  "100 fly",
]
const EVENT_ORDER = Object.fromEntries(Object.entries(Object.assign({}, EVENTS)).map(entry => entry.reverse()));

let formElement;
let formSelectElement;
let errorMessageElement;
let timesTableBodyElement;

document.addEventListener("DOMContentLoaded", function(){
  formElement = document.getElementById("form");
  formSelectElement = document.getElementById("times-to-show");
  errorMessageElement = document.getElementById("error-message");
  timesTableBodyElement = document.getElementById("times");
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
      if (response.status === 200) {
        response.json().then(results => handleSuccess(results));
      }
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

function handleSuccess(results) {
  errorMessageElement.style.display = "none";

  results.sort((a, b) => buildSortKey(a) > buildSortKey(b));

  let newTimesTableBodyElement = document.createElement('tbody');
  results.forEach(result => {
    const tableRowElement = document.createElement("tr");
    tableRowElement.appendChild(createTableCellElement(result["Event"]));
    tableRowElement.appendChild(createTableCellElement(result["Result"]));
    tableRowElement.appendChild(createTableCellElement(result["Date"]));
    tableRowElement.appendChild(createTableCellElement(result["Meet"]));
    newTimesTableBodyElement.appendChild(tableRowElement);
  });
  timesTableBodyElement.parentNode.replaceChild(newTimesTableBodyElement, timesTableBodyElement);
  timesTableBodyElement = newTimesTableBodyElement
}

function buildSortKey(result) {
  return `${EVENT_ORDER[result["Event"]].padStart(2, "0")}${result["Result"].padStart(7, "0")}`;
}

function createTableCellElement(value) {
  const tableCellElement = document.createElement("td");
  tableCellElement.innerHTML = value;
  return tableCellElement;
}

function handleError(text) {
  errorMessageElement.style.display = null;
  errorMessageElement.innerHTML = text;
}
