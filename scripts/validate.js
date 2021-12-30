const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  };

const showInputError = (elementForm, inputElement, config, errorMessage) => {
  const errorElement = elementForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (elementForm, inputElement, config) => {
  const errorElement = elementForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (elementForm, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(elementForm, inputElement, config, inputElement.validationMessage);
  } else {
    hideInputError(elementForm, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toogleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(config.inactiveButtonClass); 
  }
};

const setEventListener = (elementForm, config) => {
  const inputList =  Array.from(elementForm.querySelectorAll(config.inputSelector));
  const buttonElement = elementForm.querySelector(config.submitButtonSelector);
  toogleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(elementForm, inputElement, config);
      toogleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((elementForm) => {
    elementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListener(elementForm, config);
  });
};

enableValidation(validationConfig);