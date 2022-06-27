import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data){
        if(!data || (Array.isArray(data) && data.length === 0) ) return this.renderError()

        this._data = data;
        const markup = this._generateMarkup()
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin' , markup);
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function(){
        let htmlMarkup  = `<div class="spinner">
                            <svg>
                              <use href="${icons}#icon-loader"></use>
                            </svg>
                          </div>`;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin' , htmlMarkup);             
    }

  

    renderError(message = this._messageError) {
        let markup = `<div class="error">
                        <div>
                        <svg>
                            <use href="${icons}#icon-alert-triangle"></use>
                        </svg>
                        </div>
                        <p>${message}</p>
                    </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin' , markup);
    }

    renderMessage(message = this._message) {
        let markup = `<div class="message">
                        <div>
                        <svg>
                            <use href="${icons}#icon-smile"></use>
                        </svg>
                        </div>
                        <p>${message}</p>
                    </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin' , markup);
    }
}