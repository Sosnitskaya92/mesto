import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, validationConfig, editBtn, popupEdit, closePopupProfileBtn, formProfileEdit, namePopup, nameProfile, jobProfile, popupAdd, formAdd, addBtn, closeAddBtn, titlePopup, linkPopup, elementsSection, imagePopup, closeImage, imagePopupPicture, subtitlePopup} from '../utils/constants.js'


const editFormValidator = new FormValidator(validationConfig, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAdd);
addFormValidator.enableValidation();

const imageWithPopup = new PopupWithImage('.popup_open');
imageWithPopup.setEventListeners();


function creatNewCard(name, link) {
  return new Card(name, link, '.element__template', imageWithPopup.openPopupImage).generateCard();
}

const section = new Section(
  {items: initialCards,
  renderer: (item) => {
    section.addItem(creatNewCard(item.name, item.link));
  }
  },
  '.elements'
);
section.renderItems();


/*function formSubmitHandlerAdd (evt) {
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
closePopupProfileBtn.addEventListener('click', () => closePopup(popupEdit));*/