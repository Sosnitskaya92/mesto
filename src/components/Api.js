export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    getUserInfo(){
        return fetch(this._baseUrl, {
            method: "GET",
            headers: this._headers   
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    };
 
    getInitialCards() {
      return fetch(this._baseUrl, {
        method: 'GET',
        headers: this._headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
      };

    editUserInfo(data) {
      return fetch(this._baseUrl, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      });
    };

    addCard(data) {
      return fetch(this._baseUrl, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      });
    };
};