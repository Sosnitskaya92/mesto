import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {elementDelete,
        validationConfig,
        popupEdit,
        namePopup,
        jobPopup,
        popupAdd,
        editBtn,
        addBtn,
        editBtnAvatar,
        elementsSection,
        imagePopupSelector,
        cardNewSelector,
        sectionSelector,
        nameProfileSelector,
        jobProfileSelector,
        avatarProfileSelector,
        editFormSelector,
        addFormSelector,
        editAvatarSelector} from '../utils/constants.js'

const userInfo = new UserInfo(nameProfileSelector, jobProfileSelector, avatarProfileSelector);
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
  const newCard = new Card(item, userId, cardNewSelector, handleCardClick, () => {handleLikeClick(item)}, () => {handleDeleteCard(item)});
  return newCard.generateCard()
}

function setUserInfo (data){
  userInfo.setUserInfo(data);
}

function editUserInfo(data) {
  userInfoApi.editUserInfo(data)
  .then(data => {
    setUserInfo(data);
  })
  .finally(() => {
    popupEditForm.closePopup();
  })
};

function updateFormValue () {
  userInfo.getUserInfo();
}

function setInputValue () {
  namePopup.value = userInfo.getUserInfo().name;
  jobPopup.value = userInfo.getUserInfo().job;
}

const popupEditForm = new PopupWithForm(editFormSelector, editUserInfo);

editBtn.addEventListener('click', () => {
  setInputValue(updateFormValue());
  popupEditForm.openPopup();
  editFormValidator.resetErrorValidation();
})

popupEditForm.setEventListeners();

function saveNewCard(data) {
  cardApi.addCard(data)
    .then(data => {
      elementsSection.prepend(creatNewCard(data))
    })
    .finally(() => {
      popupAddForm.closePopup()
    })
  };

 const popupAddForm = new PopupWithForm(addFormSelector, saveNewCard);

addBtn.addEventListener('click', () =>{
  popupAddForm.openPopup();
  addFormValidator.toogleButtonState();
  addFormValidator.resetErrorValidation();
});

popupAddForm.setEventListeners();

const userInfoApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/users/me',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
});
// данные загружены с сервера 
let userId

userInfoApi.getUserInfo()
.then((data) => {
  userId = data._id;
  setUserInfo(data);
});

const cardApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/cards',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
});

// рендер карточек с сервера 
cardApi.getInitialCards()
.then(data => {
 const defaultCards = new Section(
    {items: data, 
     renderer: (item) => {
        defaultCards.addItem(creatNewCard(item));}
    }, sectionSelector
);
 defaultCards.renderItems();
    
});

//обновление аватар
const avatarApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/users/me/avatar',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
});

userInfoApi.getUserInfo()
  .then(data => {
    setAvatar(data);
  })

const popupEditAvatar = new PopupWithForm(editAvatarSelector, (data) => {editAvatar(data)});
popupEditAvatar.setEventListeners()

function setAvatar(data) {
  userInfo.setAvatar(data);
}

function editAvatar(data) {
  avatarApi.editAvatar(data)
  .then((data) => {
    setAvatar(data)
  })
  .finally(() => {
    popupEditAvatar.closePopup()
  })
};

editBtnAvatar.addEventListener('click', () => {
  popupEditAvatar.openPopup();
})

//карточки и лайк

const likeApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36/cards/likes',
  headers: {
      authorization: "9bb3333e-8dc8-44bf-a219-29f503167caa",
      "Content-Type": "application/json"
  }
})

const deleteWithPopup = new PopupWithDelete(elementDelete);

deleteWithPopup.setEventListeners();

function handleDeleteCard(card) {    
  deleteWithPopup.openPopup();
  deleteWithPopup.handleSubmit(() => {
      cardApi.deleteCard(card.id)
      .then((card) =>{
        card.deleteElement(card);
      })
      .then(() => {
      deleteWithPopup.closePopup()
      }) 
  })     
}

function handleLikeClick(card){
  if(card.isLiked()) {
    likeApi.deleteCardLike(card.id)
    .then(dataCard => {card.setLikes(dataCard.likes)})
  } else {
    likeApi.putCardLike(card.id)
    .then(dataCard => {card.setLikes(dataCard.likes)})
  }
  console.log(card)
}