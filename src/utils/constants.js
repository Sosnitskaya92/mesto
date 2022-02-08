export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const initialCards = [
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

export const editBtn = document.querySelector('.profile__edit');
export const popupEdit = document.querySelector('.popup_edit');
export const closePopupProfileBtn = document.querySelector('.popup__close_edit');
export const formProfileEdit = document.querySelector('.popup__form_edit');
export const namePopup = document.querySelector('.popup__input_type_name');
export const jobPopup = document.querySelector('.popup__input_type_info');
export const nameProfile = document.querySelector('.profile__title');
export const jobProfile = document.querySelector('.profile__text');
export const popupAdd = document.querySelector('.popup_add');
export const formAdd = document.querySelector('.popup__form_add');
export const addBtn = document.querySelector('.profile__add');
export const closeAddBtn = document.querySelector('.popup__close_add');
export const titlePopup = document.querySelector('.popup__input_type_title');
export const linkPopup = document.querySelector('.popup__input_type_link');
export const elementsSection = document.querySelector('.elements');
export const imagePopup = document.querySelector('.popup_open');
export const closeImage = document.querySelector('.popup__close_img');
export const imagePopupPicture = document.querySelector('.popup__image');
export const subtitlePopup = document.querySelector('.popup__subtitle');