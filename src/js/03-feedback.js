import throttle from "lodash.throttle";

const refs = {
  form: document.querySelector(".feedback-form"),
  email: document.querySelector(".feedback-form input"),
  message: document.querySelector(".feedback-form textarea"),
};

const localStrgState = localStorage.getItem("feedback-form-state");

if (localStrgState) {
  let inputData = JSON.parse(localStrgState);
  refs.email.value = inputData.email ? inputData.email : "";
  refs.message.value = inputData.message ? inputData.message : "";
}

refs.form.addEventListener("submit", onFormSubmit);
refs.email.addEventListener("input", throttle(onFormInput, 500));
refs.message.addEventListener("input", throttle(onFormInput, 500));

function onFormInput(evt) {
  const localStrgState = localStorage.getItem("feedback-form-state");
  let inputData = localStrgState ? JSON.parse(localStrgState) : new Object();

  inputData[evt.target.name] = evt.target.value;
  localStorage.setItem("feedback-form-state", JSON.stringify(inputData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem("feedback-form-state")));
  refs.form.reset();
  localStorage.removeItem("feedback-form-state");
}
