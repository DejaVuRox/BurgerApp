import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngridient'

const Burger = (props) => {
    // key - extracting the key of a given object and turns into an.. 
    //...array the value 'numbers' will not be part of the array, only
    //..the strings
    let transformedIngredients = Object.keys(props.ingredients)
    //then map over the array and transform the string value...
    //...into an array that has as many elements as we have ingredients...
    .map(ingKey => {
    // return an array 'method', the length is the amount of ingredients..
    //..and access the given key, all will get is an array [,] with 2 elements    
        return [...Array(props.ingredients[ingKey])]
    // we will execute map on the array to map the elements..
    // ..does not matter what element so we use '_', the index is important..
        .map((_,i) => {            
            return <BurgerIngredient key={ingKey + i} type={ingKey}/>
        })
    })

    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default Burger
