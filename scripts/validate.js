const showInputError = (elementForm, inputElement, errorMessage) => {
    const errorElement = elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (elementForm, inputElement) => {
    const errorElement = elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
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
     buttonElement.classList.add('popup__save_inactive');
   } else {
     buttonElement.classList.remove('popup__save_inactive'); 
   }
  };
  
  const setEventListener = (elementForm) => {
    const inputList =  Array.from(elementForm.querySelectorAll('.popup__input'));
    const buttonElement = elementForm.querySelector('.popup__save');
    toogleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(elementForm, inputElement);
        toogleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((elementForm) => {
      elementForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(elementForm);
      });
    };
  
     enableValidation();