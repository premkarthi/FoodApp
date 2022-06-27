import 'core-js';
import 'regenerator-runtime';
import { async } from 'regenerator-runtime';
import * as model from './model';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import resultView from './views/resultView';
import searchView from './views/searchView';

if(module.hot){
  module.hot.accept();
}

const controlRecipe = async function(){
  try {
    let id  = window.location.hash.slice(1)

    if(!id) return;
   
     //Loader
    recipeView.renderSpinner();

    //Loading Recipe
    await model.loadRecipe(id);
    
    recipeView.render(model.state.recipe)

  } catch (error) {
      console.log(error.message);
      recipeView.renderError()
  }
};


const controlSearchResults  = async function(){
  try {

    resultView.renderSpinner()

    let query = searchView.getQuery();

    if(!query) return

    await model.loadSearchResults(query)

    resultView.render(model.controlSearchResultsPage(1))
    
    paginationView.render(model.state.search)

  } catch (error) {
    console.log(error.message);
  }
}

const controlPagination = function(gotoPage){
  resultView.render(model.controlSearchResultsPage(gotoPage))
    
  paginationView.render(model.state.search)
}

const cortrolRecipeIngredents = function(newServing){
  model.updateServings(newServing)
  recipeView.render(model.state.recipe)
}

function init(){
  recipeView.addEventHandler(controlRecipe);
  recipeView.addHandlerUpadateServings(cortrolRecipeIngredents)
  searchView.addEventHandler(controlSearchResults);
  paginationView.addEventHandler(controlPagination);

}

init()