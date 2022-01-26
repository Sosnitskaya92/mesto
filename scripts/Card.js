export class Card {
  constructor(name, link, cardSelector, openImagePopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
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

  _deleteElement() {
    this._element.remove();
    this._element = null;
  };

  _setEventListners() {
    this._element.querySelector(".element__heart").addEventListener('click', (evt) => this._addlike(evt));
    this._element.querySelector(".element__delete").addEventListener('click', () => this._deleteElement());
    this._element.querySelector(".element__image").addEventListener('click', () => this._openImagePopup(this._link, this._name));
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListners();

    const elementImage = this._element.querySelector(".element__image");
    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._name;

    return this._element;
  }
}