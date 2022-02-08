import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
      super(popupSelector);
      this._submitFormFunction = submitFormFunction;
      this._form = document.querySelector('.popup__form');
    }

    _getInputValues() {
      const formValue = {};
      this._form.document.querySelectorAll('popup__input').forEach(input => {
        formValue[input.name] = input.value;
      
      return formValue;  
      });
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
}