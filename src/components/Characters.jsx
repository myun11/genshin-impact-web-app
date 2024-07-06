import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Characters = (props) => {
    const [filteredCharacters, setFilteredCharacters] = useState(props.characters)
    const [icons, setIcons] = useState([])

    // API call for one character
    const getCharacterData = async (char) => {
        await axios.get('https://genshin.jmp.blue/characters/' + char)
        .then(res => console.log(res.data))
    }

    // Helper function for converting character array into img src array for each character in grid.
    const getCharacterIcons = () => {
        const img_src_arrays_map = new Map();
        props.characters.map(char => {
           img_src_arrays_map[char] = "https://genshin.jmp.blue/characters/" + char + "/icon-big"
        })
        setIcons(img_src_arrays_map)
    }



    useEffect(() => {
        getCharacterIcons()
    }, [])

    // Renders each character background orange for 5 star and purple for 4 star

    return (
        <div>
             <h1>Characters</h1>
                <button onClick = {() => console.log(props.masterCharacterData["amber"]["rarity"])}>get props master info</button>
            {/* Filter function that filters prop's array into filteredCharacters array. */}
            {/* Also accounts for capitalization variances. */}
            <input type = "string" placeholder='Search Character' onChange = {(e) => {
                let emptyArray = props.characters.filter(entry => entry.includes(e.target.value.toLowerCase()))
                setFilteredCharacters(emptyArray)
            }}/>

            {/* Character Grid */}
            <div className = "grid grid-cols-4 gap-4">
                {filteredCharacters.map(entry => {
                    if (props.masterCharacterData[entry]["rarity"] == 4) {
                        return(
                            <div className = "w-full h-full">
                                <button className = "rounded-lg bg-gradient-to-b from-purple-500 to-white" ><img className="w-full h-full rounded-lg bg-gradient-to-b from-purple-500 to-white" src = {icons[entry]} onClick = {() => getCharacterData(entry)}/></button>
                                <h2 className = "capitalize">{entry}</h2>
                            </div>
                        )
                    }
                    if (props.masterCharacterData[entry]["rarity"] == 5) {                   
                        return(
                            <div className = "w-full h-full">
                                <button className = "rounded-lg bg-gradient-to-b from-orange-500 to-white" ><img className="w-full h-full rounded-lg bg-gradient-to-b from-orange-500 to-white" src = {icons[entry]} onClick = {() => getCharacterData(entry)}/></button>
                                <h2 className = "capitalize">{entry}</h2>
                            </div>
                        )
                    }
                    
                })}                
            </div>
            
        </div>
    )
}

export default Characters