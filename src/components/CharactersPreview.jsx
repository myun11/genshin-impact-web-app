import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CharactersPreview = (props) => {
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)
    const [vision, setVision] = useState("")
    // Setting up dict for the varying background colors.
    let vision_css = {}
    function fillDict() {
        vision_css['Pyro'] =   'w-screen bg-gradient-to-b from-red-400 to-black'
        vision_css['Geo'] =    'w-screen bg-gradient-to-b from-orange-400 to-black'
        vision_css['Dendro'] = 'w-screen bg-gradient-to-b from-green-400 to-black'
        vision_css['Electro'] ='w-screen bg-gradient-to-b from-purple-400 to-black'
        vision_css['Hydro'] =  'w-screen bg-gradient-to-b from-blue-400 to-black'
        vision_css['Anemo'] =  'w-screen bg-gradient-to-b from-teal-400 to-black'
        vision_css['Cryo'] =   'w-screen bg-gradient-to-b from-cyan-400 to-black'
    }
    const getCharacterImage = async (char) => {
        
        // wanderer api
        // try {
        //     await axios.get("https://api.wanderer.moe/game/genshin-impact/splash-art/")
        //     .then(res => {
        //         // We have to modify the name from Kamisato Ayaka to kamisato-ayaka for this API.
        //         let name = char.replace(" ", "-").toLowerCase()

        //         // Traveler will show Lumine and Aether together.
        //         if (name == "traveler") {
        //             name = "lumine-nobg"
        //         }
        //         const matched = res.data.images.filter(entry => entry.name == name)
                
        //         // Since the API is unfinished, some characters only have images for either of 'name' or 'name-nobg' where -nobg means "no background"
        //         if (matched.length > 0) {
        //             setCard(matched[0]["path"])
        //         } else {
        //             setCard(res.data.images.filter(entry => entry.name == name + "-nobg")[0]["path"])
        //         }
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
        
        // genshin api
        setCard("https://genshin.jmp.blue/characters/" + char.toLowerCase() + "/card")
    }

    useEffect(() => {
        getCharacterImage(props.charPreviewData.id)
        // getCharacterImage(props.charPreviewData.name)
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
        <div className={vision} >
            <button onClick = {() => {
                props.setCharPreviewData([])
                props.setCharPreviewState(false)
            }}> Go Back </button>

            {/* Top section divided into two columns */}
            <div className = "grid grid-cols-2 gap-4">
                <div>
                    <img className = "w-1/3" src={card}></img>
                </div>
                <div>
                    <h1>{props.charPreviewData.name}</h1>
                    <br/>
                    <h1>{props.charPreviewData.title}</h1>
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
                </div>
            </div>

            

            {/* More complex content that will appear at the bottom of page. */}
            <p>Constellation: {props.charPreviewData.constellation}</p>
            <p>Constellations (6 drop down goes here?): </p>
            <p>Passive Talents: (3 drop down goes here?): </p>
            <p>Skill Talents: (3 drop down goes here?):</p>
        </div>
  )
}

export default CharactersPreview