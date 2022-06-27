import { async } from "regenerator-runtime"
import { API_URL, RESULT_PER } from "./config";
import { getJson } from './helpers'

export const state = {
    recipe : {},
    search: {
        query : '',
        results : [],
        page: 1,
        resultPerPage : RESULT_PER,
    }
}



export const loadRecipe = async function(id){
    try {
        let data = await getJson(`${API_URL}${id}`)

        const { recipe } = data.data;

        state.recipe = {
            id : recipe.id,
            title : recipe.title,
            publisher : recipe.publisher,
            sourceUrl : recipe.source_url,
            image : recipe.image_url,
            serving : recipe.servings,
            cookingTime : recipe.cooking_time,
            ingredients: recipe.ingredients 
        }


    } catch (error) {
        console.log(`${error} 👹👹👹`);
        throw error
    }
}


export const loadSearchResults  = async function(query){
    try {

        state.search.query = query

        let data = await getJson(`${API_URL}?search=${query}`)

        state.search.results = data.data.recipes.map(dat => {
            return {
                id : dat.id,
                title : dat.title,
                publisher : dat.publisher,
                image : dat.image_url,
            }
        })


    } catch (error) {
        console.log(`${error} 👹👹👹`);
        throw error
    }
}



export const controlSearchResultsPage = function(page){
    state.search.page = page
    let start = (page - 1) * state.search.resultPerPage;
    let end = page * state.search.resultPerPage;
  
    return state.search.results.slice(start, end)
}
  

export const updateServings = function(newServe){
    state.recipe.ingredients.forEach(element => {
        element.quantity = (element.quantity * newServe) / state.recipe.serving
    });
    console.log(state.recipe);
    state.recipe.serving = newServe
}
  