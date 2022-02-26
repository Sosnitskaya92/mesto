export default class Card {
  constructor(data, userId, cardSelector, handleCardClick, handleLikeClick, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this.id = data._id;  

    this._userId = userId;
  
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
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

  deleteElement() {
    this._element.remove();
    this._element = null;
  };

  _setEventListners() {
    this._element.querySelector(".element__heart").addEventListener('click', () =>  this._handleLikeClick());
    this._element.querySelector(".element__delete").addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector(".element__image").addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListners();
    this.handleDeleteButton();
    this.updateLikeButton();

    const elementImage = this._element.querySelector(".element__image");
    this._element.querySelector('.element__title').textContent = this._name;
    elementImage.src = this._link;
    elementImage.alt = this._name;

    return this._element;
  }

  checkCardOwner() {
    if (this._userId === this._owner) {
      return(true)
    }
  }

  handleDeleteButton() {
    if (this.checkCardOwner() === true) {
      this._element.querySelector('.element__delete').classList.remove('element__delete_inactive');  
    } else {
      this._element.querySelector('.element__delete').classList.add('element__delete_inactive');
    }
  }

  isLiked() {
   return this._likes.some(owner => owner._id === this._userId);
  }

  updateLikeButton() {
    if (this.isLiked()) {
      this._element.querySelector('.element__heart').classList.add('element__heart_active')
    } else {
      this._element.querySelector('.element__heart').classList.remove('element__heart_active')}
  }

  _updateLikeNumber() {
      this._element.querySelector('.element__heart-number').textContent = this._likes.length;
      this._element.querySelector('.element__heart').classList.toggle('element__heart_active')
  }
  
  setLikes(dataCard) {
    this._likes = dataCard;
    this._updateLikeNumber();
  }
}