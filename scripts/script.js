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


function addCard (element) {
  elementsSection.prepend(element);
}

function bypassElement (array) {
  array.forEach((element)=> addCard(createElement(element)));
}

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
}

function formSubmitHandlerAdd (evt) {
  evt.preventDefault(); 
  const cardElement = {
    name: titlePopup.value,
    link: linkPopup.value,
  };
  addCard(createElement(cardElement));
  closePopupAdd();
  formAdd.reset();
}

function addlike (evt) {
  const eventTargetLike = evt.target;
  eventTargetLike.classList.toggle('element__heart_active');
}

function deleteElement (evt) {
  const evenTargetDelete = evt.target
  evenTargetDelete.closest('.element').remove();
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  nameProfile.textContent = namePopup.value;
  jobProfile.textContent = jobPopup.value;
  closePopupEdit();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupAdd() {
  openPopup(popupAdd);
}

function openPopupEdit() {
  openPopup(popupEdit);
  namePopup.value = nameProfile.textContent;
  jobPopup.value = jobProfile.textContent;
}

function openPopupImage(link, elem) {
  imagePopup.src = link;
  imagePopup.alt = elem;
  subtitlePopup.textContent = elem;
  openPopup(popupOpen);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closePopupAdd() {
  closePopup(popupAdd);
}

function closePopupEdit() {
  closePopup(popupEdit);
}

function closePopupImage() {
  closePopup(popupOpen);
}

bypassElement(initialCards);
addBtn.addEventListener('click', openPopupAdd);
editBtn.addEventListener('click', openPopupEdit);
closeBtn.addEventListener('click', closePopupEdit);
closeAddBtn.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', formSubmitHandlerAdd);
closeImage.addEventListener('click', closePopupImage);