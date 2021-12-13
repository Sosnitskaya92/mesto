 
const editBtn = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup__edit');
const closeBtn = document.querySelector('.popup__close_edit');
const formElement = document.querySelector('.popup__form_edit');
const namePopup = document.querySelector('.popup__input_type_name');
const jobPopup = document.querySelector('.popup__input_type_info');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__text');
const popupAdd = document.querySelector('.popup__add');
const formAdd = document.querySelector('.popup__form_add');
const addBtn = document.querySelector('.profile__add');
const closeAddBtn = document.querySelector('.popup__close_add');


function openPopup() {
  popup.classList.add("popup_opened");
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
    //вызвали функцию закрытия попап окна
  closePopup();
}

function OpenPopupAdd() {
  popupAdd.classList.add("popup_opened"); 
}

function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}

function formSubmitHandlerAdd (evt) {
  evt.preventDefault(); 
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
    //вызвали функцию закрытия попап окна
  closePopup();
}

addBtn.addEventListener('click', OpenPopupAdd);
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
closeAddBtn.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', formSubmitHandler);