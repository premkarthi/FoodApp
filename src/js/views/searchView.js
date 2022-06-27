class searchView {
    #parentElement = document.querySelector('.search');

    getQuery(){
        const query = this.#parentElement.querySelector('.search__field').value;
        this.#clear();
        return query;
    }

    #clear(){
        this.#parentElement.querySelector('.search__field').value = ''
    }

    addEventHandler(handler){
        this.#parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler()
        })
    }
}

export default new searchView();