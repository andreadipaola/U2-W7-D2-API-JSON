let name = document.getElementById("name");
let surname = document.getElementById("surname");
let username = document.getElementById("username");
let city = document.getElementById("city");
let zipcode = document.getElementById("zipcode");

let save = document.getElementById("save");
let del = document.getElementById("delete");

window.onload = () => {
  getUserData();
};

// SET
const setUserData = function () {
  const userData = {
    name: name.textContent,
    surname: surname.textContent,
    username: username.textContent,
    city: city.textContent,
    zipcode: zipcode.textContent
  };
  localStorage.setItem("obj", JSON.stringify(userData));
};

// GET
const getUserData = function () {
  const lastUserData = localStorage.getItem("obj");
  if (lastUserData) {
    const parsedUserData = JSON.parse(lastUserData);
  }
};

// REMOVE
const removeData = function () {
  localStorage.removeItem("obj");
};

save.onclick = () => {
  setUserData();
};

del.onclick = () => {
  removeData();
};

// CONTATORE
let counter = document.getElementById("counter");
let counterValue = parseInt(sessionStorage.getItem("lastCounterValue")) || 0;

const updateCounter = () => {
  counter.innerText = counterValue;
};

window.onload = () => {
  updateCounter();
};

const incrementCounter = () => {
  counterValue += 1;
  updateCounter();
  sessionStorage.setItem("lastCounterValue", counterValue);
};
