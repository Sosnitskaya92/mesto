import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitFormFunction = submitFormFunction;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    // this._submitButton =  this._popup.querySelector('.popup__save');
    
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this._getInputValues());
    });
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }

  renderLoading(isLoading, buttonText) {
    this._submitButton =  this._popup.querySelector('.popup__save');
    if (isLoading) {
      this._submitButton.textContent = `Сохранение...`;
    }
    else {
      this._submitButton.textContent = buttonText;
    }
  }
}