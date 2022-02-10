import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  
  openPopupImage = (link,name) => {
    this._imagePopupPicture = this._popup.querySelector('.popup__image');
    this._subtitlePopup = this._popup.querySelector('.popup__subtitle');

    this._imagePopupPicture.src = link;
    this._imagePopupPicture.alt = name;
    this._subtitlePopup.textContent = name;

    super.openPopup();
  }
}