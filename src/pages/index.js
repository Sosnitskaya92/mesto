import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, validationConfig, editBtn, popupEdit, closePopupProfileBtn, formProfileEdit, namePopup, jobPopup, nameProfile, jobProfile, popupAdd, formAdd, addBtn, closeAddBtn, titlePopup, linkPopup, elementsSection, imagePopup, closeImage, imagePopupPicture, subtitlePopup} from '../utils/constants.js'

//валидация форм
const editFormValidator = new FormValidator(validationConfig, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAdd);
addFormValidator.enableValidation();

const imageWithPopup = new PopupWithImage('.popup_open');
imageWithPopup.setEventListeners();
// создать и вставить исходный массив
const defaultCards = new Section(
  {items: initialCards, 
   renderer: (item) => {
    const newCard = new Card(item, '.element__template', imageWithPopup.openPopupImage).generateCard();
    defaultCards.addItem(newCard);}
   },'.elements'
);

defaultCards.renderItems();

//устанавливаю новые данные пользователя 
function setUserInfo (info) {
    const newInfo = new UserInfo('.profile__title', '.profile__text');
    newInfo.setUserInfo(info)
    return newInfo
}
// подставить в форму при открытиии
function setInputValue (){
    const defaultFormValue = new UserInfo('.profile__title', '.profile__text');
    namePopup.value = defaultFormValue.getUserInfo().name;
    jobPopup.value = defaultFormValue.getUserInfo().job;

}

const popupEditForm = new PopupWithForm('.popup_edit', setUserInfo);

editBtn.addEventListener('click', () =>{
    setInputValue()
    popupEditForm.openPopup();
})

popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('.popup_add', (data) => {
    const cardElement = new Card(data, '.element__template', imageWithPopup.openPopupImage).generateCard();
    elementsSection.prepend(cardElement)
});

addBtn.addEventListener('click', () =>{
  popupAddForm.openPopup();
});

popupAddForm.setEventListeners();