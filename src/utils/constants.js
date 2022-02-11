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
export const addBtn = document.querySelector('.profile__add');

export const namePopup = document.querySelector('.popup__input_type_name');
export const jobPopup = document.querySelector('.popup__input_type_info');

export const popupEdit = document.querySelector('.popup_edit');
export const popupAdd = document.querySelector('.popup_add');

export const elementsSection = document.querySelector('.elements');

export const imagePopupSelector = '.popup_open';
export const cardNewSelector = '.element__template';
export const sectionSelector = '.elements';
export const nameProfileSelector = '.profile__title';
export const jobProfileSelector = '.profile__text';
export const editFormSelector = '.popup_edit';
export const addFormSelector = '.popup_add';
