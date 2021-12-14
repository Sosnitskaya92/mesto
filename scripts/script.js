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
const popup = document.querySelector('.popup_edit');
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
console.log(closeImage);

function addCards (element) {
  elementsSection.prepend(element);
}

function bypassElement (array) {
  array.forEach((element)=> addCards(createElement(element)));
}

function createElement(element) {
  const cardsElem = elementTemplate.cloneNode(true);
  cardsElem.querySelector('.element__image').src = element.link;
  cardsElem.querySelector('.element__image').alt = element.name;
  cardsElem.querySelector('.element__title').textContent = element.name;
  elementsSection.addEventListener('click', addlike);
  elementsSection.addEventListener('click', deleteElement);
  elementsSection.addEventListener('click', openImage); 
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

function addlike (evt) {
  const eventTargetLike = evt.target;
  if (evt.target.classList.contains('element__heart')) {
    eventTargetLike.classList.toggle('element__heart_active');
  }
}

function deleteElement (evt) {
  const evenTargetDelete = evt.target
  if (evenTargetDelete.classList.contains('element__delete')) {
    evt.target.closest('.element').remove();
  }
}

function openImage (evt) {
  const evenTargetImage = evt.target
  if (evenTargetImage.classList.contains('element__image')) {
    imagePopup.src = evenTargetImage.src;
    subtitlePopup.textContent = evenTargetImage.alt;
    openPopupImage();
  }
}

function openPopupImage() {
  popupOpen.classList.add("popup_opened");
}

function closePopupImage() {
  popupOpen.classList.remove("popup_opened");
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
  closePopup();
}

function OpenPopupAdd() {
  popupAdd.classList.add("popup_opened"); 
}

function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}

bypassElement(initialCards);
addBtn.addEventListener('click', OpenPopupAdd);
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
closeAddBtn.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', formSubmitHandlerAdd);
closeImage.addEventListener('click', closePopupImage);