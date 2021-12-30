const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
  };

const showInputError = (elementForm, inputElement, errorMessage) => {
  const errorElement = elementForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
  
const hideInputError = (elementForm, inputElement) => {
  const errorElement = elementForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
  
const isValid = (elementForm, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(elementForm, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(elementForm, inputElement);
  }
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
  
const toogleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(validationConfig.inactiveButtonClass); 
  }
};
  
const setEventListener = (elementForm) => {
  const inputList =  Array.from(elementForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = elementForm.querySelector(validationConfig.submitButtonSelector);
  toogleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(elementForm, inputElement);
      toogleButtonState(inputList, buttonElement);
    });
  });
};
  
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((elementForm) => {
    elementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListener(elementForm);
  });
};
  
enableValidation(validationConfig);