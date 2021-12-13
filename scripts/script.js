/* добавление массива*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

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
const titlePopup = document.querySelector('.popup__input_type_title');
const linkPopup = document.querySelector('.popup__input_type_link');
const elementTemplate = document.querySelector('.element__template').content;
const elementsSection = document.querySelector('.elements');
const titleTemplate = document.querySelector('.element__title');
const imageTemplate = document.querySelector('.element__image');

function addCards (element) {
  elementsSection.prepend(element);
}

function bypassElement (array) {
  array.forEach((element)=> addCards(createElement(element)));
}

bypassElement(initialCards);

function createElement(element) {
  const cardsElem = elementTemplate.cloneNode(true);
  cardsElem.querySelector('.element__image').src = element.link;
  cardsElem.querySelector('.element__image').alt = element.name;
  cardsElem.querySelector('.element__title').textContent = element.name;
  return cardsElem;
}

function formSubmitHandlerAdd (evt) {
  evt.preventDefault(); 
  const cardElement = {
    name: titlePopup.value,
    link: linkPopup.value,
  };
  addCards(createElement(cardElement));
  closePopupAdd();
  formAdd.reset();
}

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



addBtn.addEventListener('click', OpenPopupAdd);
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
closeAddBtn.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', formSubmitHandlerAdd);