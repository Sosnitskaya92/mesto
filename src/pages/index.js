import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards,
        validationConfig,
        editBtn, popupEdit,
        namePopup,
        jobPopup,
        popupAdd,
        addBtn, 
        elementsSection,
        imagePopupSelector,
        cardNewSelector,
        sectionSelector,
        nameProfileSelector,
        jobProfileSelector,
        editFormSelector,
        addFormSelector} from '../utils/constants.js'

const userInfo = new UserInfo(nameProfileSelector, jobProfileSelector);
//валидация форм
const editFormValidator = new FormValidator(validationConfig, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAdd);
addFormValidator.enableValidation();

const imageWithPopup = new PopupWithImage(imagePopupSelector);
imageWithPopup.setEventListeners();

// открыть картинку
function handleCardClick(link, name) {
  imageWithPopup.openPopupImage(link, name);
}

// создать экземпляр карточки
function creatNewCard(item) {
  const newCard = new Card(item, cardNewSelector, handleCardClick);
  return newCard.generateCard()
}

// создать и вставить исходный массив
const defaultCards = new Section(
  {items: initialCards, 
   renderer: (item) => {
     defaultCards.addItem(creatNewCard(item));}
   },
   sectionSelector
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

const popupEditForm = new PopupWithForm(editFormSelector, (data) => {
  setUserInfo(data)
});

editBtn.addEventListener('click', () => {
  setInputValue()
  popupEditForm.openPopup();
  editFormValidator.resetErrorValidation();
})

popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(addFormSelector, (data) => {
    elementsSection.prepend(creatNewCard(data));
});

addBtn.addEventListener('click', () =>{
  popupAddForm.openPopup();
  addFormValidator.toogleButtonState();
  addFormValidator.resetErrorValidation();
});

popupAddForm.setEventListeners();