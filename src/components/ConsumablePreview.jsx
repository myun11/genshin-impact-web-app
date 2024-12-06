import React from 'react'

const ConsumablePreview = (props) => {
  return (
    <div className = "grid grid-cols-1 border-2 border-black dark:border-white">
        <p><button onClick = {() => console.log(props)}>props</button></p>
        <p>Base Dish: {props.data.baseDish ? props.data.baseDish : "N/A"}</p>
        <p>Character: {props.data.character ? props.data.character : "N/A"}</p>
        <p>Description: {props.data.description ? props.data.description : "N/A"}</p>
        <p>Effect: {props.data.effect ? props.data.effect : "N/A"}</p>
        
        <p>Name: {props.data.name ? props.data.name : "N/A"}</p>
        <p>Rarity: {props.data.rarity ? props.data.rarity : "N/A"}</p>
        
        {/* Recipe has 3 images. */}
        <p>Has Recipe: {props.data.hasRecipe ? props.data.hasRecipe : "N/A"}</p>
        <div className = "grid grid-cols-2"> 
          {props.data.recipe ? props.data.recipe.map(entry => {
          return(
            <div className = "row-span-2">
              <div>Item: {entry.item}</div>
              <div>Quantity: {entry.quantity}</div>
            </div>)
          }) : "N/A"}
        </div>
        
        <p>Type: {props.data.type ? props.data.type : "N/A"}</p>
        <p>Proficiency: {props.data.proficiency ? props.data.proficiency : "N/A"}</p>
    </div>
  )
}

export default ConsumablePreview