import React from 'react'

const ConsumablePreview = (props) => {
  return (
    <div className = "grid grid-cols-3">
        ConsumablePreview
        <button onClick = {() => console.log(props)}>props</button>
        Base Dish: {props.data.baseDish}
        Character: {props.data.character}
        Description: {props.data.description}
        Effect: {props.data.effect}
        Has Recipe: {props.data.hasRecipe}
        Name: {props.data.name}
        Rarity: {props.data.rarity}
        {/* Recipe has 3 images. */}
        Recipe: 
        Type: {props.data.type}
    </div>
  )
}

export default ConsumablePreview