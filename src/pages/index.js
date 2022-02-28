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
        popupAdd,
        popupAvatar,
        namePopup,
        jobPopup,
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
        editAvatarSelector} from '../utils/constants.js';

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

const popupEditAvatar = new PopupWithForm(editAvatarSelector, (data) => {editAvatar(data)});
popupEditAvatar.setEventListeners()

const deleteWithPopup = new PopupWithDelete(elementDelete);
deleteWithPopup.setEventListeners();

const userInfoApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/users/me',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
});

const cardApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/cards',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
});

const avatarApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/users/me/avatar',
  headers: {
    authorization: '9bb3333e-8dc8-44bf-a219-29f503167caa',
    'Content-Type': 'application/json'
  }
});

const likeApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36/cards',
  headers: {
    authorization: "9bb3333e-8dc8-44bf-a219-29f503167caa",
    'Content-Type': 'application/json'
  }
})

// С сервера данные
userInfoApi.getUserInfo()
  .then((data) => {
    userId = data._id;
    setUserInfo(data);
  })
  .catch((err) => {
    console.log(err); 
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
  })
  .catch((err) => {
    console.log(err);
  });

//обновление аватар
userInfoApi.getUserInfo()
  .then(data => {
    setAvatar(data);
  })
  .catch((err) => {
    console.log(err);
  }); 

function setAvatar(data) {
  userInfo.setAvatar(data);
};
  
function editAvatar(data) {
  avatarApi.editAvatar(data)
  .then((data) => {
    setAvatar(data)
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    popupEditAvatar.closePopup()
  })
};

// открыть картинку
function handleCardClick(link, name) {
  imageWithPopup.openPopupImage(link, name);
};

function handleDeleteCard(card) {    
  deleteWithPopup.openPopup();
  deleteWithPopup.handleSubmit(() => {
      cardApi.deleteCard(card.id)
      .then(() =>{
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
  if(card.isLiked()) {
    likeApi.deleteCardLike(card.id)
    .then(dataCard => {card.setLikes(dataCard.likes)})
    .catch((err) => {
      console.log(err); 
    });
  } else {
    likeApi.putCardLike(card.id)
    .then(dataCard => {card.setLikes(dataCard.likes)})
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

function setUserInfo (data){
  userInfo.setUserInfo(data);
};

function editUserInfo(data) {
  userInfoApi.editUserInfo(data)
  .then(data => {
    setUserInfo(data);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    popupEditForm.closePopup();
  })
};

function updateFormValue () {
  userInfo.getUserInfo();
};

function setInputValue () {
  namePopup.value = userInfo.getUserInfo().name;
  jobPopup.value = userInfo.getUserInfo().job;
};

function saveNewCard(data) {
  cardApi.addCard(data)
    .then(data => {
      elementsSection.prepend(creatNewCard(data))
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      popupAddForm.closePopup()
    })
  };

editBtn.addEventListener('click', () => {
  popupEditForm.backTextButtonSave();
  setInputValue(updateFormValue());
  popupEditForm.openPopup();
  editFormValidator.resetErrorValidation();
});

addBtn.addEventListener('click', () =>{
  popupAddForm.backTextButtonCreat();
  popupAddForm.openPopup();
  addFormValidator.toogleButtonState();
  addFormValidator.resetErrorValidation();
});

editBtnAvatar.addEventListener('click', () => {
  popupEditAvatar.backTextButtonSave();
  popupEditAvatar.openPopup();
  avatarFormValidator.resetErrorValidation();
});