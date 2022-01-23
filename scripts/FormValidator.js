export class FormValidator {
  constructor(validationConfig, elementFormSelector) {
    this._validationConfig = validationConfig;
    this._elementFormSelector = elementFormSelector;
  }

  _showInputError(inputElement,errorMessage) {
    const errorElement = this._elementFormSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);   
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._elementFormSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toogleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._validationConfig.inactiveButtonClass); 
    }
  };

  _setEventListener() {
    const inputList =  Array.from(this._elementFormSelector.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._elementFormSelector.querySelector(this._validationConfig.submitButtonSelector);
    this._toogleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._isValid(inputElement);
        this._toogleButtonState(inputList, buttonElement);
      });
    });
  };
  
  enableValidation() {
    this._setEventListener();
  };
};