import React, {useState, useEffect } from 'react'
import axios from 'axios'
import CharactersPreview from './CharactersPreview'
import moment from 'moment'

// Weapon icons
import Bow_Icon from '../images/Icon_Bow.webp'
import Catalyst_Icon from '../images/Icon_Catalyst.webp'
import Claymore_Icon from '../images/Icon_Claymore.webp'
import Polearm_Icon from '../images/Icon_Polearm.webp'
import Sword_Icon from '../images/Icon_Sword.webp'
import Orange_Star from '../images/Orange_Star.png'
import Purple_Star from '../images/Purple_Star.png'
import Loader from './Loader'

const Characters = (props) => {
    
    // Array of filtered characters
    const [filteredCharacters, setFilteredCharacters] = useState(props.characters)

    const [filteredArray, setFilteredArray] = useState(props.masterCharacterDataArray)

    // For toggling between grid and table for filteredArray
    // True for table and false for grid
    const [form, setForm] = useState(true)

    // For table form
    const [page, setPage] = useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    
    // Icons for each character button in the grid
    const [icons, setIcons] = useState([])

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

    // An array of weapons to iterate through for convenience
    const weapons = [
        ['Sword', 'favonius-sword'],
        ['Bow', 'favonius-warbow'],
        ['Claymore', 'favonius-greatsword'],
        ['Polearm', 'favonius-lance'],
        ['Catalyst', 'favonius-codex']
    ]

    function getIcon(wep) {
        let icon = null
        if (wep == "Sword") {
            icon = Sword_Icon
        }
        if (wep == "Bow") {
            icon = Bow_Icon
        }
        if (wep == "Claymore") {
            icon = Claymore_Icon
        }
        if (wep == "Polearm") {
            icon = Polearm_Icon
        }
        if (wep == "Catalyst") {
            icon = Catalyst_Icon
        }
        return(icon)
    }

    // Color palette for choosing different characters based on their vision.
    const colors = {
        "Dendro" : "bg-lime-100 dark:bg-lime-600 ",
        "Pyro" : "bg-red-100 dark:bg-red-600 ",
        "Hydro" : "bg-blue-100 dark:bg-blue-600",
        "Electro" : "bg-violet-100 dark:bg-violet-600",
        "Anemo" : "bg-teal-100 dark:bg-teal-600",
        "Geo" : "bg-amber-100 dark:bg-amber-600",
        "Cryo" : "bg-sky-100 dark:bg-sky-600" 
    }
    // const colors = {
    //     "Dendro" : "absolute dark:inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] ",
    //     "Pyro" : "bg-red-100 dark:bg-red-600 ",
    //     "Hydro" : "bg-blue-100 dark:bg-blue-600",
    //     "Electro" : "bg-violet-100 dark:bg-violet-600",
    //     "Anemo" : "bg-teal-100 dark:bg-teal-600",
    //     "Geo" : "bg-amber-100 dark:bg-amber-600",
    //     "Cryo" : "bg-sky-100 dark:bg-sky-600" 
    // }

    // The current selected elements, weapon types, and rarities that the user can filter through by pressing buttons.
    // This allows for multiple element filtering.
    const [selectedElements, setSelectedElements] = useState([])
    const [selectedWeapons, setSelectedWeapons] = useState([])
    const [selectedRarity, setSelectedRarity] = useState(null)
    // Searchable name filtering
    const [selectedName, setSelectedName] = useState("")

    // API call for one character
    // const getCharacterData = async (char) => {
    //     await axios.get('https://genshin.jmp.blue/characters/' + char)
    //     .then(res => console.log(res.data))
    // }

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

    // Map version
    // useEffect(() => {
    //     if (selectedElements.length > 0) {
    //         let empty_array = props.characters.filter(char => {
    //             let char_vision = props.masterCharacterDataMap[char]["vision"]
    //             // console.log(char_vision)
    //             // console.log(selectedElements)
    //             return (selectedElements.includes(char_vision))
    //         })
    //         setFilteredCharacters(empty_array)
    
    //     } else {
    //         setFilteredCharacters(props.characters)
    //     }
    // }, [selectedElements,])

    // Array version
    useEffect(() => {
        let currentArray = props.masterCharacterDataArray
        if (selectedElements.length == 0 && selectedWeapons.length == 0 && selectedRarity == null && selectedName.length == 0) {
            setFilteredArray(currentArray)
        }

        if (selectedElements.length > 0) {
            let emptyArray = currentArray.filter(char => {
                let char_vision = char["vision"]
                return (selectedElements.includes(char_vision))
            })
            currentArray = emptyArray
        }

        if (selectedWeapons.length > 0) {
            let emptyArray = currentArray.filter(char => {
                let char_weapon = char["weapon"]
                return (selectedWeapons.includes(char_weapon))
            })
            currentArray = emptyArray
        }

        if (selectedRarity != null) {
            let emptyArray = currentArray.filter(char => {
                let char_rarity = char["rarity"]
                return(selectedRarity == char_rarity)
            })
            currentArray = emptyArray
        }

        if (selectedName.length > 0) {
            let emptyArray = currentArray.filter(char => char["name"].toLowerCase().includes(selectedName.toLowerCase()))
            currentArray = emptyArray
        }

        //Alphabetically sort the array at the end.
        currentArray = currentArray.sort((a,b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
        })
        setFilteredArray([...currentArray])

    }, [selectedElements, selectedWeapons, selectedRarity, selectedName])

    if (props.masterCharacterDataArray) {
    // Renders each character background orange for 5 star and purple for 4 star
    return (
    <div className = {props.charPreviewState ? colors[props.charPreviewData.vision] + " p-2 md:p-4" : " p-2 md:p-4"}>
        {/* When state is true, the current character details page will be rendered. When false, the grid will be rendered. */}
        {props.charPreviewState ? 
            <div className="">
                <CharactersPreview
                    setCharPreviewState={props.setCharPreviewState}
                    setCharPreviewData={props.setCharPreviewData}
                    charPreviewData={props.charPreviewData}
                />  
            </div>
            :
            <div className='min-h-screen'>
                <div className="h-20"></div>
                <h1 className = "p-4 text-black dark:text-white">Characters</h1>
                {/* <div> */}
                    {/* Debugging */}
                    {/* <button onClick = {() => console.log(props.masterCharacterData)}>props masterCharacterData</button>
                    <button onClick = {() => console.log(props.characters)}>props characters</button>
                    <button onClick = {() => console.log(filteredCharacters)}>filteredCharacters</button>
                    <button onClick = {() => console.log(charPreviewData)}>preview character</button> */}
                    {/* <button onClick = {() => {
                        const weapons = []
                        props.characters.map(char => {
                            weapons.push(props.masterCharacterData[char]["weapon"])
                        })
                        console.log(new Set(weapons))
                    }}>list of weapons</button> */}
                {/* </div> */}

                {/* Filter function that filters prop's array into filteredCharacters array. */}
                {/* Also accounts for capitalization variances. */}
                <div className = "md:m-4">
                    <div className =  " bg-slate-800 dark:bg-slate-500 h-1 w-full"></div>
                    <div className="lg:inline-flex m-2 md:m-4 md:space-x-7 max-lg:space-y-2">

                        {/* Filter by element */}
                        <div className="flex p-2 items-center justify-center">
                        {elements.map(res => {
                            return(
                                <div className="relative group inline-block">
                                    <button className = {selectedElements.includes(res) ? "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-800 dark:bg-gray-300" : "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-400 dark:bg-gray-500"} onClick = {() =>
                                        {
                                            if (selectedElements.includes(res)) {
                                                // setSelectedElements([...selectedElements.filter(entry => entry != res)])
                                                setSelectedElements(current => [...current].filter(entry => entry != res))
                                            } else {
                                                // setSelectedElements([...selectedElements, res])
                                                setSelectedElements(current => [...current, res])
                                            }
                                            // console.log(selectedElements.length > 0)
                                            // console.log(selectedElements.includes(res))
                                            // console.log(selectedElements)
                                        }
                                    }>
                                        <img className="object-scale-down w-full h-full rounded-lg" src = {'https://genshin.jmp.blue/elements/' + res.toLowerCase() + '/icon'} />
                                    </button>
                                    <div className="max-md:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-300 dark:bg-slate-400 text-black dark:text-white text-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {res}
                                    </div>            
                                </div>
                            )
                        })}
                        </div>
                        {/* Filter by weapon type */}
                        <div className="flex p-2 items-center justify-center">
                        {weapons.map(entry => {
                            let wep = entry[0]
                            let icon = getIcon(wep)

                            return(
                                <div className="relative group inline-block">
                                    <button className={selectedWeapons.includes(wep) ? "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-800 dark:bg-gray-300" : "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-400 dark:bg-gray-500"} onClick = {() => {
                                        if (selectedWeapons.includes(wep)) {
                                            setSelectedWeapons([...selectedWeapons].filter(entry => entry != wep))
                                        } else {
                                            setSelectedWeapons([...selectedWeapons, wep])
                                        }
                                    }}>
                                        <img className="object-scale-down h-full w-full rounded-lg" src = {icon} />
                                    </button>
                                    <div className="max-md:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-300 dark:bg-slate-400 text-black dark:text-white text-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {wep}
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                        {/* Filter by rarity */}
                        <div className="flex p-2 items-center justify-center">
                            <div className="relative group inline-block">
                                <button className = {selectedRarity == 4 ? "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-800 dark:bg-gray-300" : "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-400 dark:bg-gray-500"} onClick = {() =>
                                    {
                                        if (selectedRarity == 4) {
                                            setSelectedRarity(null)
                                        } else {
                                            setSelectedRarity(4)
                                        }
                                    }
                                }>
                                    <img className="object-scale-down md:h-16 md:w-16 rounded-lg" src = {Purple_Star} />
                                </button>
                                <div className="max-md:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-300 dark:bg-slate-400 text-black dark:text-white text-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    4&nbsp;Star&nbsp;Rarity
                                </div>
                            </div>
                            <div className="relative group inline-block">
                                <button className = {selectedRarity == 5 ? "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-800 dark:bg-gray-300" : "flex items-center max-md:w-10 max-md:h-10 py-1 px-1 rounded-full bg-gray-400 dark:bg-gray-500"} onClick = {() =>
                                    {
                                        if (selectedRarity == 5) {
                                            setSelectedRarity(null)
                                        } else {
                                            setSelectedRarity(5)
                                        }
                                    }
                                }>
                                    <img className="object-scale-down md:h-16 md:w-16 rounded-lg" src = {Orange_Star} />
                                </button>
                                <div className="max-md:hidden absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-300 dark:bg-slate-400 text-black dark:text-white text-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    5&nbsp;Star&nbsp;Rarity
                                </div>
                            </div>
                        </div>

                        {/* Filter by name */}
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 max-lg:w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="character-search" type = "string" placeholder='Search Character' value= {selectedName} onChange = {(e) => {
                            setSelectedName(e.target.value)
                        }}/>

                        {/* Toggle between grid and table */}
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={form} className="sr-only peer" onClick = {() => setForm(prev => !prev)}/>
                            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm md:text-md lg:text-lg font-medium text-black dark:text-gray-300">Toggle Grid/Table</span>
                        </label>                        
                    </div>
                    <div className = "bg-slate-800 dark:bg-slate-500 h-1 w-full"></div>
                </div>

                {/* Map version  */}
                {/* <input type = "string" placeholder='Search Character' onChange = {(e) => {
                    let emptyArray = props.characters.filter(entry => entry.includes(e.target.value.toLowerCase()))
                    setFilteredCharacters(emptyArray)
                }}/> */}


                {/* Character Grid */}
                {/* Map version. */}
                {/* <div className = "grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 ">
                    {filteredCharacters.map(entry => {
                        if (props.masterCharacterDataMap[entry]["rarity"] == 4) {
                            return(
                                <div className = "w-full h-full">
                                    <button className = "rounded-lg bg-gradient-to-b from-purple-500 to-white" ><img className="w-full h-full rounded-lg bg-gradient-to-b from-purple-500 to-white" src = {icons[entry]} onClick = {() => {
                                        setCharPreviewState(true)
                                        setCharPreviewData(props.masterCharacterDataMap[entry])
                                    }}/></button>
                                    <h2 className = "capitalize">{entry}</h2>
                                </div>
                            )
                        }
                        if (props.masterCharacterDataMap[entry]["rarity"] == 5) {                   
                            return(
                                <div className = "w-full h-full">
                                    <button className = "rounded-lg bg-gradient-to-b from-orange-500 to-white" ><img className="w-full h-full rounded-lg bg-gradient-to-b from-orange-500 to-white" src = {icons[entry]} onClick = {() => {
                                        setCharPreviewState(true)
                                        setCharPreviewData(props.masterCharacterDataMap[entry])
                                    }}/></button>
                                    <h2 className = "capitalize">{entry}</h2>
                                </div>
                            )
                        }
                        
                    })}                
                </div>   */}

                {/* Array version */}
                {/* Grid */}
                {form ? <div>{filteredArray.length > 0 ?
                <div className = "lg:w-4/5 lg:mx-auto grid max-md:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2 md:gap-4">
                    {filteredArray.map(entry => {
                        if (entry["rarity"] == 4) {
                            return(
                                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-purple-500 hover:border-purple-500 transition duration-300 ease-in-out">
                                    <button className = "bg-gradient-to-b from-purple-500 to-white" >
                                        <img className="box-content w-full h-full rounded-lg " src = {icons[entry["id"].toLowerCase()]} onClick = {() => {
                                        props.setCharPreviewState(true)
                                        props.setCharPreviewData(entry)
                                    }}/></button>
                                    <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{entry["name"]}</h2>
                                </div>
                            )
                        }
                        if (entry["rarity"] == 5) {                   
                            return(
                                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-orange-500 hover:border-orange-500 transition duration-300 ease-in-out">
                                    <button className = "bg-gradient-to-b from-orange-500 to-white" >
                                        <img className="w-full h-full rounded-lg " src = {icons[entry["id"].toLowerCase()]} onClick = {() => {
                                        props.setCharPreviewState(true)
                                        props.setCharPreviewData(entry)
                                    }}/></button>
                                    <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{entry["name"]} {entry["name"] == "Traveler" ? '(' + entry["vision"] + ')' : ""}</h2>
                                </div>
                            )
                        }
                    })}
                </div> : <div className="text-black dark:text-white flex items-center justify-center md:text-3xl p-8">No characters available.</div>}</div>:

                // Table
                
                <div className="lg:w-4/5 lg:mx-auto flex flex-col">
                    <div className=" overflow-x-auto">
                        <div className="">
                            <div className="bg-white dark:bg-slate-700 border border-black dark:border-neutral-700 divide-y divide-gray-200 dark:divide-neutral-700">
                                <div className="overflow-hidden">
                                    <table className="w-full table-fixed min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                        <thead className="bg-gray-100 dark:bg-neutral-700">
                                            <tr className="divide-x divide-gray-200 dark:divide-slate-500">
                                                <th scope="col" className="md:text-sm lg:text-lg w-1/2 md:w-[19%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Icon</th>
                                                <th scope="col" className="md:text-sm lg:text-lg w-1/2 md:w-[19%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Name</th>
                                                <th scope="col" className="md:text-sm lg:text-lg max-md:hidden md:w-[19%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Vision</th>
                                                <th scope="col" className="md:text-sm lg:text-lg max-md:hidden md:w-[19%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Weapon</th>
                                                <th scope="col" className="md:text-sm lg:text-lg max-md:hidden md:w-[19%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Rarity</th>
                                                <th scope="col" className="md:text-sm lg:text-lg max-lg:hidden md:w-[19%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Nation</th>
                                                <th scope="col" className="md:text-sm lg:text-lg max-lg:hidden md:w-[19%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Release Date</th>
                                                {/* <th scope="col" className=" md:w-[5%] px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300"></th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        { filteredArray.length > 0 ?
                                            filteredArray.map((entry, idx) => {
                                                if (idx >= page * entriesPerPage && idx < (page + 1) * entriesPerPage) {
                                                    return(
                                                        <tr className="md:text-lg lg:text-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-400 ease-in-out">
                                                            <td className="w-1/2 whitespace-nowrap text-start font-medium text-gray-800 dark:text-neutral-200">
                                                                <button className = "bg-transparent hover:border-transparent" onClick = {() => {
                                                                    props.setCharPreviewState(true)
                                                                    props.setCharPreviewData(entry)
                                                                }}>
                                                                    {/* <div className=""> */}
                                                                        <img className="box-content w-1/2 md:w-full lg:w-1/2 h-fit rounded-lg " src = {icons[entry["id"].toLowerCase()]}/>
                                                                        {/* {entry["name"]} */}
                                                                    {/* </div> */}
                                                                </button>
                                                            </td>
                                                            <td className="px-6 w-1/2 whitespace-nowrap text-start font-medium text-gray-800 dark:text-neutral-200">{entry["name"]}</td>
                                                            <td className="max-md:hidden text-wrap whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">
                                                                <div className="">
                                                                    {/* {entry["vision"]} */}
                                                                    <img className="object-scale-down rounded-lg" src = {'https://genshin.jmp.blue/elements/' + entry["vision"].toLowerCase() + '/icon'} />
                                                                </div>
                                                                
                                                            </td>
                                                            <td className="max-md:hidden text-wrap whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">
                                                                {/* {entry["weapon"]} */}
                                                                <img className="object-scale-down rounded-lg" src = {getIcon(entry["weapon"])} />   
                                                                
                                                            </td>
                                                            <td className="px-6 max-md:hidden whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">
                                                                {entry["rarity"] == 4 ? 
                                                                    <img className="object-scale-down w-16 h-16 rounded-lg" src = {Purple_Star} /> :
                                                                    <img className="object-scale-down w-16 h-16 rounded-lg" src = {Orange_Star} />
                                                                }
                                                            </td>
                                                            <td className="px-6 max-lg:hidden text-wrap whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">
                                                                {entry["nation"]}
                                                            </td>
                                                            <td className="px-6 max-lg:hidden text-wrap whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">
                                                                {moment(entry["release"], "YYYY-MM-DD").format("MMMM D YYYY")}
                                                                {/* moment(props.charPreviewData.release, "YYYY-MM-DD").format("MMMM D YYYY") */}
                                                            </td>
                                                        </tr>
                                                        )        
                                                }
                                            }) :
                                            <div className = "flex items-center justify-center">
                                                
                                            </div>
                                            
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="py-1 px-4 bg-gray-100 dark:bg-neutral-700">
                                    <nav className="flex items-center space-x-1" aria-label="Pagination">
                                        <button onClick = {() => {
                                            if (page != 0) {
                                                setPage(prev => prev - 1)
                                            }
                                        }} type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-gray-400 dark:bg-gray-900 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                            <span className="sr-only">Previous</span>
                                        </button>
                                        {
                                            
                                            filteredArray.map((entry, idx) => {
                                                if (idx < filteredArray.length / entriesPerPage) {
                                                    return(
                                                        <button onClick = {() => {
                                                            setPage(idx)
                                                        }}type="button" className={page == idx ? 
                                                            "bg-gray-400 dark:bg-black min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                                            :
                                                            "bg-gray-200 dark:bg-gray-600 min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"}>{idx + 1}</button>
                                                    )
                                                }
                                            })
                                        }
                                        <button onClick = {() => {
                                            if (page != Math.floor(filteredArray.length / entriesPerPage)) {
                                                setPage(prev => prev + 1)
                                            }
                                        }} type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-gray-400 dark:bg-gray-900 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Next">
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">»</span>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }    
            </div>
        }
    </div>
)
    } else {
        <div>
            <Loader/>
        </div>
        
    }
    
}

export default Characters