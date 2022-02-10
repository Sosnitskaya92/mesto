import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, validationConfig, editBtn, popupEdit, namePopup, jobPopup, popupAdd, addBtn, elementsSection} from '../utils/constants.js'

const userInfo = new UserInfo('.profile__title', '.profile__text');
//валидация форм
const editFormValidator = new FormValidator(validationConfig, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAdd);
addFormValidator.enableValidation();

const imageWithPopup = new PopupWithImage('.popup_open');
imageWithPopup.setEventListeners();

// открыть картинку
function handleCardClick(link, name) {
  imageWithPopup.openPopupImage(link, name);
}

// создать и вставить исходный массив
const defaultCards = new Section(
  {items: initialCards, 
   renderer: (item) => {
    const newCard = new Card(item, '.element__template', handleCardClick).generateCard();
    defaultCards.addItem(newCard);}
   },'.elements'
);

defaultCards.renderItems();

// подставить в форму при открытиии
function setInputValue (){
  namePopup.value = userInfo.getUserInfo().name;
  jobPopup.value = userInfo.getUserInfo().job;
}
// новые данные
function setUserInfo(data) {
  userInfo.setUserInfo(data);
}

const popupEditForm = new PopupWithForm('.popup_edit', (data) => {
  setUserInfo(data)
});

editBtn.addEventListener('click', () => {
  setInputValue()
  popupEditForm.openPopup();
})

popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('.popup_add', (data) => {
    const cardElement = new Card(data, '.element__template', handleCardClick).generateCard();
    elementsSection.prepend(cardElement);
});

addBtn.addEventListener('click', () =>{
  popupAddForm.openPopup();
  addFormValidator.toogleButtonState();
});

popupAddForm.setEventListeners();