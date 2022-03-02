export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    };

    return userInfo;
  }

  setUserInfo(info) {
    this._name.textContent = info.name;
    this._job.textContent = info.about;
    this._avatar.src = info.avatar;
    this._id = info._id;
  }
}
