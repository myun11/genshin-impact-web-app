import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Characters = (props) => {
    const [filteredCharacters, setFilteredCharacters] = useState(props.characters)
    const getCharacterData = async (char) => {
        await axios.get('https://genshin.jmp.blue/characters/' + char)
        .then(res => console.log(res.data))
    }

    const [icons, setIcons] = useState([])

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
    return (
        <div>
            <h1>Characters</h1>
            {/* <button onClick = {() => console.log(icons["albedo"])}>get icon</button> */}
            {/* <button onClick = {() => console.log(props.characters)}>get prop characters</button> */}
            {/* Filter function that filters prop's array into filteredCharacters array. */}
            <input type = "string" placeholder='Search Character' onChange = {(e) => {
                // console.log(e.target.value)
                let emptyArray = props.characters.filter(entry => entry.includes(e.target.value))
                setFilteredCharacters(emptyArray)
            }}/>

            {/* Character Grid */}
            <div className = "grid grid-cols-5 gap-2">
                {filteredCharacters.map(entry => {
                    return(
                        <div className = "w-24 h-24">
                            
                            
                            <button><img className="w-15 h-15"src = {icons[entry]} onClick = {() => getCharacterData(entry)}/></button>
                            <h2>{entry}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Characters