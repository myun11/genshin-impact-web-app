import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CharactersPreview = (props) => {
    const [card, setCard] = useState("")
    const [loading, setLoading] = useState(true)
    // const getCharacterImage = async () => {
    //     try {
    //         await axios.get("https://genshin.jmp.blue/characters/" + props.charPreviewData.id + "/card")
    //         .then(res => setCard(res.data))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    useEffect(() => {
        // getCharacterImage()
        setCard("https://genshin.jmp.blue/characters/" + props.charPreviewData.id + "/card")
    },[])
    
    return (
        <div>
            <button onClick = {() => console.log(props)}>props</button>
            <button onClick = {() => console.log(card)}>card</button>
            <button onClick = {() => {
                props.setCharPreviewData([])
                props.setCharPreviewState(false)
            }}> Go Back </button>
            <img src={card}></img>


        </div>
  )
}

export default CharactersPreview