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

  deleteElement() {
    this._element.remove();
    this._element = null;
  };

  _setEventListners() {
    this._elementLike.addEventListener('click', () =>  this._handleLikeClick(this));
    this._elementDelete.addEventListener('click', () => this._handleDeleteCard(this));
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }
  
  generateCard() {
    this._element = this._getTemplate();

    //переменные
    this._elementImage = this._element.querySelector(".element__image");
    this._elementLike = this._element.querySelector(".element__heart");
    this._elementDelete = this._element.querySelector(".element__delete");
    this._elementNumberLike = this._element.querySelector(".element__heart-number");
        
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._elementNumberLike.textContent = this._likes.length;
    
    this._setEventListners();
    this.handleDeleteButton();
    this.updateLikeButton();

    return this._element;
  }

  checkCardOwner() {
    if (this._userId === this._owner) {
      return(true)
    }
  }

  handleDeleteButton() {
    if (this.checkCardOwner() === true) {
      this._elementDelete.classList.remove('element__delete_inactive');
    } else {
      this._elementDelete.classList.add('element__delete_inactive');
    }
  }

  isLiked() {
   return this._likes.some(owner => owner._id === this._userId);
  }

  updateLikeButton() {
    if (this.isLiked()) {
      this._elementLike.classList.add('element__heart_active')
    } else {
      this._elementLike.classList.remove('element__heart_active')}
  }

  _updateLikeNumber() {
    this._elementNumberLike.textContent = this._likes.length;
    this._elementLike.classList.toggle('element__heart_active')
  }
  
  setLikes(dataCard) {
    this._likes = dataCard;
    this._updateLikeNumber();
  }
}