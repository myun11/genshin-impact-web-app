import React, {useState} from 'react'
import axios from 'axios'

const Characters = (props) => {
    const [filteredCharacters, setFilteredCharacters] = useState(props.characters)
    const getCharacterData = async (char) => {
        await axios.get('https://genshin.jmp.blue/characters/' + char)
        .then(res => console.log(res.data))
    }

    return (
        <div>
            <h1>Characters</h1>

            {/* Filter function that filters prop's array into filteredCharacters array. */}
            <input type = "string" placeholder='Search Character' onChange = {(e) => {
                // console.log(e.target.value)
                let emptyArray = props.characters.filter(entry => entry.includes(e.target.value))
                setFilteredCharacters(emptyArray)
            }}/>
            {/* <button onClick = {() => {console.log(filteredCharacters)}}>Characters Array</button> */}
            <div>
                {filteredCharacters.map(entry => {
                    return(<button id = {entry} onClick = {() => getCharacterData(entry)}>{entry}</button>)
                })}
            </div>
        </div>
    )
}

export default Characters