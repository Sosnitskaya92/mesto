import { openPopupImage } from './index.js';

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }; 

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _addlike = evt => {
      const eventTargetLike = evt.target;
      eventTargetLike.classList.toggle('element__heart_active');
  }

  _deleteElement = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListners() {
    this._element.querySelector(".element__heart").addEventListener('click', this._addlike);
    this._element.querySelector(".element__delete").addEventListener('click', this._deleteElement);
    this._element.querySelector(".element__image").addEventListener('click', () => { openPopupImage(this._link, this._name)});
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListners();

    const ElementImage = this._element.querySelector(".element__image");
    this._element.querySelector('.element__title').textContent = this._name;
    ElementImage.src = this._link;
    ElementImage.alt = this._name;

    return this._element;   
  } 
}