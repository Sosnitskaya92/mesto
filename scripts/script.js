const editBtn = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form')
const namePopup = document.querySelector('.popup__input_type_name');
const jobPopup = document.querySelector('.popup__input_type_info');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__text');

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

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click',closePopup);
formElement.addEventListener('submit', formSubmitHandler);