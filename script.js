const firstName = document.getElementById('name');
const lastName = document.getElementById('surname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
const radioButtons = document.querySelectorAll("input[name='radio']");

const form = document.querySelector('.form');
const modal = document.querySelector('.modal-container');
const closeModal = document.querySelector('.close-modal');

const popupFirstName = document.querySelector('.first-name');
const popupLastName = document.querySelector('.last-name');
const popupEmail = document.querySelector('.email');
const popupPhone = document.querySelector('.phone-number');
const popupMessage = document.querySelector('.message');
const popupContentState = document.querySelector('.content-state');

const formInputs = [firstName, lastName, email, phone, message];

formInputs.forEach(item => item.addEventListener('change', updateLocalStorage));
[...radioButtons].forEach(item => item.addEventListener('change', getRadioButtonsValue));

function setDataFromLocalStorage() {
  formInputs.forEach(item => setValueFromLocalStorageTo(item));
  getCheckedRadioButton()
  let radioButtonToCheck = [...radioButtons].find(item => item.value === getCheckedRadioButton());
  if (radioButtonToCheck) {
    radioButtonToCheck.checked = true;
  }
};

function setValueFromLocalStorageTo(element) {
  element.value = localStorage.getItem(element.id);
};

function getCheckedRadioButton() {
  const radioButtonLocalStorageVal = localStorage.getItem(['radio-button']);
  return radioButtonLocalStorageVal;
};


window.onload = function () {
  setDataFromLocalStorage();
};

function updateLocalStorage(event) {
  localStorage.setItem(event.target.id, event.target.value);
};

function getRadioButtonsValue(event) {
  const checkedRadio = event.target.checked ? event.target.value : '';
  localStorage.setItem('radio-button', checkedRadio);
};

function onSubmit(e) {
  e.preventDefault();
  setDataToModal();
  form.reset();
  modal.style.display = "flex";
  onReset();
};

function setDataToModal() {
  const modalDataStructure = [[firstName.id, popupFirstName], [lastName.id, popupLastName], [email.id, popupEmail], [phone.id, popupPhone], [message.id, popupMessage], ['radio-button', popupContentState]]
  modalDataStructure.forEach(item => item[1].appendChild(document.createTextNode(localStorage.getItem(item[0]))));
};

function onModalClose(e) {
  e.preventDefault()
  modal.style.display = "none";
  window.location.reload();
};

function onReset() {
  localStorage.clear();
};

form.addEventListener("submit", onSubmit);
resetBtn.addEventListener("click", onReset);
closeModal.addEventListener("click", onModalClose);