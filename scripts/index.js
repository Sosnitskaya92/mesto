import {initialCards} from './initialCards.js'
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'

const editBtn = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const closePopupProfileBtn = document.querySelector('.popup__close_edit');
const formProfileEdit = document.querySelector('.popup__form_edit');
const namePopup = document.querySelector('.popup__input_type_name');
const jobPopup = document.querySelector('.popup__input_type_info');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__text');
const popupAdd = document.querySelector('.popup_add');
const formAdd = document.querySelector('.popup__form_add');
const addBtn = document.querySelector('.profile__add');
const closeAddBtn = document.querySelector('.popup__close_add');
const titlePopup = document.querySelector('.popup__input_type_title');
const linkPopup = document.querySelector('.popup__input_type_link');
const elementsSection = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup_open');
const closeImage = document.querySelector('.popup__close_img');
const imagePopupPicture = document.querySelector('.popup__image');
const subtitlePopup = document.querySelector('.popup__subtitle');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const editFormValidator = new FormValidator(validationConfig, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAdd);
addFormValidator.enableValidation();

function creatNewCard(name, link) {
  return new Card(name, link, '.element__template', openPopupImage).generateCard();
}

function addCreatNewCard(element) {
  elementsSection.prepend(element)
}

initialCards.forEach((item) => {
  addCreatNewCard(creatNewCard(item.name, item.link));
});

function formSubmitHandlerAdd (evt) {
  evt.preventDefault(); 
  const cardElement = {
    name: titlePopup.value,
    link: linkPopup.value,
  };
  addCreatNewCard(creatNewCard(cardElement.name, cardElement.link));
  closePopup(popupAdd)
  formAdd.reset();
  addFormValidator.toogleButtonState();
};

function submitProfileForm (evt) {
  evt.preventDefault(); 
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  closePopup(popupEdit);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape);
  document.addEventListener('mousedown', closeOverlay);
};

function openPopupEdit() {
  openPopup(popupEdit);
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;
};

function openPopupImage(link, name) {
  imagePopupPicture.src = link;
  imagePopupPicture.alt = name;
  subtitlePopup.textContent = name;
  openPopup(imagePopup);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
  document.removeEventListener('mousedown', closeOverlay);
};

function closeEscape (evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  };
};

function closeOverlay (evt) {
  const openPopup = document.querySelector('.popup_opened');
  if (evt.target === openPopup) {
    closePopup(openPopup);
  };
};

formProfileEdit.addEventListener('submit', submitProfileForm);
formAdd.addEventListener('submit', formSubmitHandlerAdd);
editBtn.addEventListener('click', openPopupEdit);
addBtn.addEventListener('click', () => openPopup(popupAdd));
closeImage.addEventListener('click', () => closePopup(imagePopup));
closeAddBtn.addEventListener('click', () => closePopup(popupAdd));
closePopupProfileBtn.addEventListener('click', () => closePopup(popupEdit));