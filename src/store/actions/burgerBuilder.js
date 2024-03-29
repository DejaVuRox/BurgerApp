import * as actionTypes from './actionTypes'
import axios from "../../axios-orders"

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ings: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-david-burger.firebaseio.com/Ingredients.json")
    .then(res => {
      dispatch(setIngredients(res.data))
    })
    .catch(err => {
      dispatch(fetchIngredientsFailed())
    })
  }
}
