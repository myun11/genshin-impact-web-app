import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CharactersPreview = (props) => {
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)
    const getCharacterImage = async (char) => {
        try {
            await axios.get("https://api.wanderer.moe/game/genshin-impact/splash-art/")
            .then(res => {
                
                // We have to modify the name from Kamisato Ayaka to kamisato-ayaka for this API.
                let name = char.replace(" ", "-").toLowerCase()
                
                const matched = res.data.images.filter(entry => entry.name == name)
                // console.log(matched)
                setCard(matched[0]["path"])
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharacterImage(props.charPreviewData.name)
        // setCard("https://genshin.jmp.blue/characters/" + props.charPreviewData.id + "/card")
    },[])
    
    return (
        <div className='bg-gradient-to-br from-red-500 to-red-200'>
            <button onClick = {() => console.log(props.charPreviewData)}>char preview data</button>
            {/* <button onClick = {() => console.log(card)}>card</button> */}
            <button onClick = {() => {
                props.setCharPreviewData([])
                props.setCharPreviewState(false)
            }}> Go Back </button>
            <img src={card}></img>

            <h1>{props.charPreviewData.name}</h1>
            <p>Affilitation: {props.charPreviewData.affiliation}</p>
            <p>Birthday: {props.charPreviewData.birthday}</p>
            <p>Constellation: {props.charPreviewData.constellation}</p>
            <p>Constellations (6 drop down goes here?): </p>
            <p>Description: {props.charPreviewData.description}</p>
            <p>Gender: {props.charPreviewData.gender}</p>
            <p>Nation: {props.charPreviewData.nation}</p>
            <p>Passive Talents: (3 drop down goes here?): </p>
            <p>Rarity: {props.charPreviewData.rarity}</p>
            <p>Release Date: {props.charPreviewData.release}</p>
            <p>Skill Talents: (3 drop down goes here?):</p>
            <p>Special Dish: {props.charPreviewData.specialDish}</p>
            <p>Title: {props.charPreviewData.title}</p>
            <p>Vision: {props.charPreviewData.vision}</p>
            <p>Weapon: {props.charPreviewData.weapon}</p>
        </div>
  )
}

export default CharactersPreview