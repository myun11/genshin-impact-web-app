import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CharactersPreview from './CharactersPreview'

const Characters = (props) => {
    
    // Array of filtered characters
    const [filteredCharacters, setFilteredCharacters] = useState(props.characters)
    
    // Icons for each character button in the grid
    const [icons, setIcons] = useState([])
    
    // This will be set to true when the user clicks on a character and then their preview component will show instead of the grid.
    const [charPreviewState, setCharPreviewState] = useState(false)

    // This is the current character's data that is being previewed.
    const [charPreviewData, setCharPreviewData] = useState([])

    // An array of elements to iterate through for convenience
    const elements = [
        'Pyro',
        'Geo',
        'Electro',
        'Dendro',
        'Cryo',
        'Hydro',
        'Anemo'
    ]

    // The current selected elements that the user can filter through by pressing buttons.
    // This allows for multiple element filtering.
    const [selectedElements, setSelectedElements] = useState([])

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

    useEffect(() => {
        if (selectedElements.length > 0) {
            let empty_array = props.characters.filter(char => {
                let char_vision = props.masterCharacterData[char]["vision"]
                // console.log(char_vision)
                // console.log(selectedElements)
                return (selectedElements.includes(char_vision))
            })
            setFilteredCharacters(empty_array)
    
        } else {
            setFilteredCharacters(props.characters)
        }
    }, [selectedElements,])
    // Renders each character background orange for 5 star and purple for 4 star

    return (
        <div>
            {/* When state is true, the current character details page will be rendered. When false, the grid will be rendered. */}
            {charPreviewState ? 
                <div>
                    <CharactersPreview
                        setCharPreviewState={setCharPreviewState}
                        setCharPreviewData={setCharPreviewData}
                        charPreviewData={charPreviewData}
                    /> 
                </div>
                :
                <div>
                <h1>Characters</h1>
                
                <div>
                    {/* Debugging */}
                    {/* <button onClick = {() => console.log(props.masterCharacterData)}>props masterCharacterData</button>
                    <button onClick = {() => console.log(props.characters)}>props characters</button>
                    <button onClick = {() => console.log(filteredCharacters)}>filteredCharacters</button>
                    <button onClick = {() => console.log(charPreviewData)}>preview character</button> */}
                </div>
                {/* Filter function that filters prop's array into filteredCharacters array. */}
                {/* Also accounts for capitalization variances. */}
                
                <div className='inline-flex m-8'>

                    {/* Filter by element */}
                    {elements.map(res => {
                        return(
                        <button className = "py-2 px-2 rounded-full" onClick = {() =>
                            {
                                if (selectedElements.includes(res)) {
                                    // setSelectedElements([...selectedElements.filter(entry => entry != res)])
                                    setSelectedElements(current => [...current].filter(entry => entry != res))
                                } else {
                                    // setSelectedElements([...selectedElements, res])
                                    setSelectedElements(current => [...current, res])
                                }
                                console.log(selectedElements.length > 0)
                                // console.log(selectedElements.includes(res))
                                // console.log(props.masterCharacterData)
                                
                            }
                        }>
                            <img className="w-full h-full rounded-lg" src = {'https://genshin.jmp.blue/elements/' + res.toLowerCase() + '/icon'} />
                        </button>
                        )
                    })}
                        <button className = "py-2 px-2 rounded-full" onClick = {() => setSelectedElements([])}>
                        All
                        </button>
                    
                                        
                    <input type = "string" placeholder='Search Character' onChange = {(e) => {
                        let emptyArray = props.characters.filter(entry => entry.includes(e.target.value.toLowerCase()))
                        setFilteredCharacters(emptyArray)
                    }}/>
                </div>
                {/* Character Grid */}
                <div className = "grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 ">
                    {filteredCharacters.map(entry => {
                        if (props.masterCharacterData[entry]["rarity"] == 4) {
                            return(
                                <div className = "w-full h-full">
                                    <button className = "rounded-lg bg-gradient-to-b from-purple-500 to-white" ><img className="w-full h-full rounded-lg bg-gradient-to-b from-purple-500 to-white" src = {icons[entry]} onClick = {() => {
                                        setCharPreviewState(true)
                                        setCharPreviewData(props.masterCharacterData[entry])
                                    }}/></button>
                                    <h2 className = "capitalize">{entry}</h2>
                                </div>
                            )
                        }
                        if (props.masterCharacterData[entry]["rarity"] == 5) {                   
                            return(
                                <div className = "w-full h-full">
                                    <button className = "rounded-lg bg-gradient-to-b from-orange-500 to-white" ><img className="w-full h-full rounded-lg bg-gradient-to-b from-orange-500 to-white" src = {icons[entry]} onClick = {() => {
                                        setCharPreviewState(true)
                                        setCharPreviewData(props.masterCharacterData[entry])
                                    }}/></button>
                                    <h2 className = "capitalize">{entry}</h2>
                                </div>
                            )
                        }
                        
                    })}                
                </div>  
            </div>
            }
        </div>
    )
}

export default Characters