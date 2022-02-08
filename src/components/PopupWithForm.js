import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormFunction) {
      super(popupSelector);
      this._submitFormFunction = submitFormFunction;
      this._form = document.querySelector('.popup__form');
    }

    _getInputValues() {
      const inputs = this._form.querySelectorAll('.popup__input');
      const formValue = Array.from(inputs).map(item => {return item.value});

      return formValue;  
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