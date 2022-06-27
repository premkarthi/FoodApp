import View from "./view";
import icons from 'url:../../img/icons.svg';

class paginationView  extends View{
    _parentElement = document.querySelector('.pagination');

    addEventHandler(handler){
        this._parentElement.addEventListener('click', function(e){
          var btn = e.target.closest('.btn--inline');

          if(!btn) return;

          const gotoPage = +btn.dataset.goto;

          console.log(gotoPage);
          handler(gotoPage)
        })
    }

    _generateMarkup(){
        const curPage = this._data.page
        const numOfPage = Math.ceil(this._data.results.length / this._data.resultPerPage);

        if(curPage === 1 && numOfPage > 1){
            return `<button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
                        <span>Page ${curPage + 1}</span>
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>`
        }
        if(curPage === numOfPage && numOfPage > 1){
            return  `<button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${curPage - 1}</span>
                    </button>`
        }
        if(curPage < numOfPage){
            return `
                    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${curPage - 1}</span>
                    </button>
                    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
                        <span>Page ${curPage + 1}</span>
                        <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                        </svg>
                    </button>`
        } 
        return ``
    }
}

export default new paginationView();
