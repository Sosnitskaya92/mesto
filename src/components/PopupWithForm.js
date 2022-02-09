import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
      super(popupSelector);
      this._submitFormFunction = submitFormFunction;
      this._form = document.querySelector('.popup__form');
    }

    _getInputValues() {
      const inputList = this._form.querySelectorAll('.popup__input');
    
      const formValues = {};
      inputList.forEach(input => formValues[input.name] = input.value);
    
        return formValues;
      }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitFormFunction(this._getInputValues());
        this.closePopup();
      });
    }
  
    closePopup() {
      this._form.reset();
      super.closePopup();
    }
}