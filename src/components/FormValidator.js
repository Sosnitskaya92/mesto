export default class FormValidator {
  constructor(validationConfig, elementForm) {
    this._validationConfig = validationConfig;
    this._elementForm = elementForm;
    this._submitButton = this._elementForm.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._elementForm.querySelectorAll(this._validationConfig.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  };

  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListener();
  };

  resetErrorValidation() {
    this._toggleButtonState()

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }
};