export default class UserInfo {
  constructor(nameSelector, jobSelector) {
      this._name = document.querySelector(nameSelector);
      this._info = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._info.textContent
    };

    return userInfo;
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._name.textContent = job;
  }
}