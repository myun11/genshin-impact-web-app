import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CharactersPreview = (props) => {
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)
    const [vision, setVision] = useState("")
    // Setting up dict for the varying background colors.
    let vision_css = {}
    function fillDict() {
        vision_css['Pyro'] = 'bg-gradient-to-br from-red-700 to-red-200'
        vision_css['Geo'] = 'bg-gradient-to-br from-orange-700 to-orange-200'
        vision_css['Dendro'] = 'bg-gradient-to-br from-green-700 to-green-200'
        vision_css['Electro'] = 'bg-gradient-to-br from-purple-700 to-purple-200'
        vision_css['Hydro'] = 'bg-gradient-to-br from-blue-700 to-blue-200'
        vision_css['Anemo'] = 'bg-gradient-to-br from-teal-700 to-teal-200'
        vision_css['Cryo'] = 'bg-gradient-to-br from-cyan-700 to-cyan-200'
    }
    const getCharacterImage = async (char) => {
        
        // wanderer api
        try {
            await axios.get("https://api.wanderer.moe/game/genshin-impact/splash-art/")
            .then(res => {



                // We have to modify the name from Kamisato Ayaka to kamisato-ayaka for this API.
                let name = char.replace(" ", "-").toLowerCase()

                // Traveler will show Lumine and Aether together.
                if (name == "traveler") {
                    name = "lumine-nobg"
                }
                const matched = res.data.images.filter(entry => entry.name == name)
                
                // Since the API is unfinished, some characters only have images for either of 'name' or 'name-nobg' where -nobg means "no background"
                if (matched.length > 0) {
                    setCard(matched[0]["path"])
                } else {
                    setCard(res.data.images.filter(entry => entry.name == name + "-nobg")[0]["path"])
                }
            })
        } catch (error) {
            console.log(error)
        }
        
        // genshin api
        // setCard("https://genshin.jmp.blue/characters/" + char.toLowerCase() + "/card")
    }

    useEffect(() => {
        // getCharacterImage(props.charPreviewData.id)
        getCharacterImage(props.charPreviewData.name)
        fillDict()
        setVision(vision_css[props.charPreviewData.vision])
        setLoading(false)
        // setCard("https://genshin.jmp.blue/characters/" + props.charPreviewData.id + "/card")
    },[vision_css, vision])
    
    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <div className={vision}>
            {/* <button onClick = {() => console.log(vision)}>char preview data</button> */}
            {/* <button onClick = {() => console.log(vision_css[vision])}>vision css</button> */}
            {/* <button onClick = {() => console.log(card)}>card</button> */}
            <button onClick = {() => {
                props.setCharPreviewData([])
                props.setCharPreviewState(false)
            }}> Go Back </button>
            <img src={card}></img>

            <h1>{props.charPreviewData.name}</h1>
            <p>Affilitation: {props.charPreviewData.affiliation}</p>
            <p>Birthday: {props.charPreviewData.birthday}</p>
            <p>Description: {props.charPreviewData.description}</p>
            <p>Gender: {props.charPreviewData.gender}</p>
            <p>Nation: {props.charPreviewData.nation}</p>
            <p>Rarity: {props.charPreviewData.rarity}</p>
            <p>Release Date: {props.charPreviewData.release}</p>            
            <p>Special Dish: {props.charPreviewData.specialDish}</p>
            <p>Title: {props.charPreviewData.title}</p>
            <p>Vision: {props.charPreviewData.vision}</p>
            <p>Weapon: {props.charPreviewData.weapon}</p>
            <p>id: {props.charPreviewData.id}</p>


            {/* More complex content that will appear at the bottom of page. */}
            <p>Constellation: {props.charPreviewData.constellation}</p>
            <p>Constellations (6 drop down goes here?): </p>
            <p>Passive Talents: (3 drop down goes here?): </p>
            <p>Skill Talents: (3 drop down goes here?):</p>
        </div>
  )
}

export default CharactersPreview