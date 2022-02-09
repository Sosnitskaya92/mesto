import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, validationConfig, editBtn, popupEdit, closePopupProfileBtn, formProfileEdit, namePopup, jobPopup, nameProfile, jobProfile, popupAdd, formAdd, addBtn, closeAddBtn, titlePopup, linkPopup, elementsSection, imagePopup, closeImage, imagePopupPicture, subtitlePopup} from '../utils/constants.js'

//валидация форм
const editFormValidator = new FormValidator(validationConfig, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAdd);
addFormValidator.enableValidation();
// модалка открытия фотки
const imageWithPopup = new PopupWithImage('.popup_open');
imageWithPopup.setEventListeners();

//создание новой карточки
function creatNewCard(name, link) {
  return new Card(name, link, '.element__template', imageWithPopup.openPopupImage).generateCard();
}
//вставка карточки в дом начального массива
const section = new Section(
  {items: initialCards,
  renderer: (item) => {
    section.addItem(creatNewCard(item.name, item.link));
  }
  },
  '.elements'
);
section.renderItems();

//карточка 
const profileEddInfo = new UserInfo('.profile__title', '.profile__text');

//открыть модалку редактирования
editBtn.addEventListener('click', openPopupEdit);

function openPopupEdit() {
  profileEddPopup.openPopup();
  namePopup.value = profileEddInfo.getUserInfo().name;
  jobPopup.value = profileEddInfo.getUserInfo().job;
}
//модалка редактирования
const profileEddPopup = new PopupWithForm('.popup_edit', submitProfileForm);
profileEddPopup.setEventListeners();

function submitProfileForm() {
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  profileEddPopup.closePopup();
};

// открыть модалку добавления
addBtn.addEventListener('click', openPopupAdd);

function openPopupAdd() {
  profileAddPopup.openPopup();
}
//модалка добавления
const profileAddPopup = new PopupWithForm('.popup_add', formSubmitHandlerAdd);
profileAddPopup.setEventListeners();

function formSubmitHandlerAdd() {
  const cardElement = {
  name: titlePopup.value,
  link: linkPopup.value,
  }
 addItem(creatNewCard(cardElement.name, cardElement.link));
  

  profileAddPopup.closePopup();
  addFormValidator.toogleButtonState();
};
/*
formProfileEdit.addEventListener('submit', submitProfileForm);
formAdd.addEventListener('submit', formSubmitHandlerAdd);
editBtn.addEventListener('click', openPopupEdit);
addBtn.addEventListener('click', () => openPopup(popupAdd));
closeImage.addEventListener('click', () => closePopup(imagePopup));
closeAddBtn.addEventListener('click', () => closePopup(popupAdd));
closePopupProfileBtn.addEventListener('click', () => closePopup(popupEdit));*/