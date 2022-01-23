const editBtn = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const closeBtn = document.querySelector('.popup__close_edit');
const formElement = document.querySelector('.popup__form_edit');
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
const elementTemplate = document.querySelector('.element__template').content;
const elementsSection = document.querySelector('.elements');
const titleTemplate = document.querySelector('.element__title');
const imageTemplate = document.querySelector('.element__image');
const popupOpen = document.querySelector('.popup_open');
const closeImage = document.querySelector('.popup__close_img');
const imagePopup = document.querySelector('.popup__image');
const subtitlePopup = document.querySelector('.popup__subtitle');
const deleteBtn = document.querySelector('.element__delete');
const saveBtn = popupAdd.querySelector('.popup__save');

function addCard (element) {
  elementsSection.prepend(element);
};

/*function bypassElement (array) {
  array.forEach((element)=> addCard(createElement(element)));
};

function createElement(element) {
  const cardsElem = elementTemplate.cloneNode(true);
  const imageTemplateClone = cardsElem.querySelector('.element__image');
  const likeTemplateClone = cardsElem.querySelector('.element__heart');
  const deleteCardBtn = cardsElem.querySelector('.element__delete');
  imageTemplateClone.src = element.link;
  imageTemplateClone.alt = element.name;
  cardsElem.querySelector('.element__title').textContent = element.name;
  likeTemplateClone.addEventListener('click', addlike);
  deleteCardBtn.addEventListener('click', deleteElement);
  imageTemplateClone.addEventListener('click', () => openPopupImage(element.link, element.name));
  return cardsElem;
};*/

function formSubmitHandlerAdd (evt) {
  evt.preventDefault(); 
  const cardElement = {
    name: titlePopup.value,
    link: linkPopup.value,
  };
  addCard(new Card(cardElement.name, cardElement.link, '.element__template').generateCard())
  closePopup(popupAdd)
  formAdd.reset();
  saveBtn.classList.add('popup__save_inactive');
  saveBtn.setAttribute("disabled", true);
};
 
//function addlike (evt) {
//  const eventTargetLike = evt.target;
//  eventTargetLike.classList.toggle('element__heart_active');
//};

//function deleteElement (evt) {
//  const evenTargetDelete = evt.target
//  evenTargetDelete.closest('.element').remove();
//};

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

function openPopupImage(link, elem) {
  imagePopup.src = link;
  imagePopup.alt = elem;
  subtitlePopup.textContent = elem;
  openPopup(popupOpen);
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

//bypassElement(initialCards);

editBtn.addEventListener('click', openPopupEdit);
formElement.addEventListener('submit', submitProfileForm);
formAdd.addEventListener('submit', formSubmitHandlerAdd);
closeAddBtn.addEventListener('click', () => closePopup(popupAdd));
addBtn.addEventListener('click', () => openPopup(popupAdd));
closeBtn.addEventListener('click', () => closePopup(popupEdit));
closeImage.addEventListener('click', () => closePopup(popupOpen));


export {openPopupImage};
import {initialCards} from './initialCards.js'
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'


// исходные карточки из массива

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.element__template');
  const CardEl = card.generateCard();
  elementsSection.prepend(CardEl);
 });

 const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  };
  // валидация 
  const EditFormValidator = new FormValidator(validationConfig, popupEdit);
  EditFormValidator.enableValidation();

  const AddFormValidator = new FormValidator(validationConfig, popupAdd);
  AddFormValidator.enableValidation();