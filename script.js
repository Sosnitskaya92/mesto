const editBtn = document.querySelector('.profile__edit-js');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');

function openPopup() {
    popup.classList.add("popup__opened");
}
function closePopup() {
    popup.classList.remove("popup__opened");
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click',closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form')
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let namePopup = document.querySelector('.popup__name').value;
    let jobPopup = document.querySelector('.popup__info').value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameProfile = document.querySelector('.profile__title');
    let jobProfile = document.querySelector('.profile__text');
    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = namePopup;
    jobProfile.textContent = jobPopup;
    //вызвали функцию закрытия попап окна
    closePopup();
   }
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 