import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  elementDelete,
  validationConfig,
  popupEdit,
  popupAdd,
  popupAvatar,
  namePopup,
  jobPopup,
  editBtn,
  addBtn,
  editBtnAvatar,
  imagePopupSelector,
  cardNewSelector,
  sectionSelector,
  nameProfileSelector,
  jobProfileSelector,
  avatarProfileSelector,
  editFormSelector,
  addFormSelector,
  editAvatarSelector
} from '../utils/constants.js';

let userId

const userInfo = new UserInfo(nameProfileSelector, jobProfileSelector, avatarProfileSelector);

//валидация форм
const editFormValidator = new FormValidator(validationConfig, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, popupAdd);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, popupAvatar);
avatarFormValidator.enableValidation();

const imageWithPopup = new PopupWithImage(imagePopupSelector);
imageWithPopup.setEventListeners();

const popupEditForm = new PopupWithForm(editFormSelector, editUserInfo);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(addFormSelector, saveNewCard);
popupAddForm.setEventListeners();

const popupEditAvatar = new PopupWithForm(editAvatarSelector, (data) => { editAvatar(data) });
popupEditAvatar.setEventListeners()

const deleteWithPopup = new PopupWithDelete(elementDelete);
deleteWithPopup.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
});

const section = new Section({
  renderer: (cards) => {
    const card = creatNewCard(cards);
    section.addItem(card);
  },
}, sectionSelector);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);

    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function editAvatar(data) {
  popupEditAvatar.renderLoading(true, 'Сохранить');
  api.editAvatar(data)
    .then((data) => {
      setUserInfo(data);
      popupEditAvatar.closePopup()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false, 'Сохранить');
    })
};

function handleCardClick(link, name) {
  imageWithPopup.openPopupImage(link, name);
};

function handleDeleteCard(card) {
  deleteWithPopup.openPopup();
  deleteWithPopup.handleSubmit(() => {
    api.deleteCard(card.id)
      .then(() => {
        card.deleteElement();
      })
      .then(() => {
        deleteWithPopup.closePopup()
      })
      .catch((err) => {
        console.log(err);
      })
  })
};

function handleLikeClick(card) {
  if (card.isLiked()) {
    api.deleteCardLike(card.id)
      .then(dataCard => { card.setLikes(dataCard.likes) })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.putCardLike(card.id)
      .then(dataCard => { card.setLikes(dataCard.likes) })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(card)
};

// создать экземпляр карточки
function creatNewCard(item) {
  const newCard = new Card(item, userId, cardNewSelector, handleCardClick, handleLikeClick, handleDeleteCard);
  return newCard.generateCard()
};

function setUserInfo(data) {
  userInfo.setUserInfo(data);
};

function editUserInfo(data) {
  popupEditForm.renderLoading(true, 'Сохранить');
  api.editUserInfo(data)
    .then(data => {
      setUserInfo(data);
      popupEditForm.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.renderLoading(false, 'Сохранить');
    })
};

function setInputValue() {
  const getUserInfo = userInfo.getUserInfo();
  namePopup.value = getUserInfo.name;
  jobPopup.value = getUserInfo.job;
};

function saveNewCard(data) {
  popupAddForm.renderLoading(true, 'Сохранить');
  api.addCard(data)
    .then(data => {
      section.addItem(creatNewCard(data))
      popupAddForm.closePopup()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddForm.renderLoading(false, 'Сохранить');
    })
};

editBtn.addEventListener('click', () => {
  setInputValue();
  popupEditForm.openPopup();
  editFormValidator.resetErrorValidation();
});

addBtn.addEventListener('click', () => {
  popupAddForm.openPopup();
  addFormValidator.resetErrorValidation();
});

editBtnAvatar.addEventListener('click', () => {
  popupEditAvatar.openPopup();
  avatarFormValidator.resetErrorValidation();
});