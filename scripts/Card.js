import {openPopupImage} from './index.js';

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

  _addlike(evt) {
      const eventTargetLike = evt.target;
      eventTargetLike.classList.toggle('element__heart_active');
  }

  _deleteElement (evt) {
    const evenTargetDelete = evt.target
    evenTargetDelete.closest('.element').remove();
  };

  _setEventListners() {
    this._element.querySelector(".element__heart").addEventListener('click', this._addlike);
    this._element.querySelector(".element__delete").addEventListener('click', this._deleteElement);
    this._element.querySelector(".element__image").addEventListener('click', () => { openPopupImage(this._link, this._name)});

  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;   
  } 
}