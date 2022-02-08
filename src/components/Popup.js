export default class Popup {
  contstructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.closePopup);
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup_opened')) { this.closePopup();}
    })
  }
}