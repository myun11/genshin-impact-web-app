import React, { useState, useEffect } from 'react'
import axios from 'axios'
import mora from '../images/mora.webp'
import { Transition } from '@headlessui/react';

const AscensionMaterials = (props) => {
    const levels = ["level_20", "level_40", "level_50", "level_60", "level_70", "level_80"]
    const [selectedTab, setSelectedTab] = useState("Total")
    const [totalMaterials, setTotalMaterials] = useState([])

    // All different types of materials. This is used for differentiating the endpoint because the images are categorized by the item's type.
    const [commonMaterials, setCommonMaterials] = useState([])
    const [localSpecialties, setLocalSpecialties] = useState([])
    const [gemMaterials, setGemMaterials] = useState([])
    const [bossMaterials, setBossMaterials] = useState([])

    // For drop down choosing ascension level on mobile
    const [isOpen, setIsOpen] = useState(false)

    // Used for taking the total materials from all ascension levels
    const sumMaterials = (materials) => {
        const reduced = Object.values(materials).flat().sort((a,b) => a["name"] > b["name"]).reduce((acc, item) => {
            if (acc[item.name]) {
                acc[item.name] += item.value;
            } else {
                acc[item.name] = item.value;
            }
            return acc;
        }, {});
        
        // Convert array into name and value pairs.
        return Object.entries(reduced).map(([name, value]) => ({ name, value }));
    };

    // Used for making the API endpoint for each item image.
    const itemImage = (item) => {
        if (item == 'Artificed Spare Clockwork Component — Coppelia') {
            return('https://genshin.jmp.blue/materials/boss-material/coppelia/')
        }
        if (item == 'Artificed Spare Clockwork Component — Coppelius') {
            return('https://genshin.jmp.blue/materials/boss-material/coppelius/')
        }
        if (item == 'Mora') {
            return mora
        }
        try {
            const itemName = item.toLowerCase().replaceAll(' ', '-').replaceAll("'", '-')
            let endpoint = ""
            if (gemMaterials.includes(itemName)) {
                endpoint = 'https://genshin.jmp.blue/materials/character-ascension/' + itemName
            } else if (localSpecialties.includes(itemName)) {
                endpoint = 'https://genshin.jmp.blue/materials/local-specialties/' + itemName
            } else if (bossMaterials.includes(itemName)) {
                endpoint = 'https://genshin.jmp.blue/materials/boss-material/' + itemName
            } else if (commonMaterials.includes(itemName)) {
                endpoint = 'https://genshin.jmp.blue/materials/common-ascension/' + itemName
            }
            return endpoint
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    // Used for capitalizing level thresholds
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

    async function fetchLists() {
        try {
            await axios.all([
                axios.get('https://genshin.jmp.blue/materials/character-ascension/list'),
                axios.get('https://genshin.jmp.blue/materials/common-ascension/list'),
                axios.get('https://genshin.jmp.blue/materials/local-specialties/list'),
                axios.get('https://genshin.jmp.blue/materials/boss-material/list')
            ])
            .then(axios.spread((gems, common, local, boss) => {
                setGemMaterials(gems.data)
                setCommonMaterials(common.data)
                setLocalSpecialties(local.data)
                setBossMaterials(boss.data)
            }))
        } catch (error) {
            console.log("Error fetching item list data: ", error)
        }
    }
    useEffect(() => {
        // Loads the item types
        fetchLists()
        // Takes the sum of materials
        setTotalMaterials(sumMaterials(props.data))
    }, [])
    return (
        <div className="md:p-4">
            <h1 className = "font-bold p-4 text-4xl md:text-5xl text-black dark:text-white">Ascension Materials</h1>
            <div className="md:flex">
                {/* PC Tabs */}
                <ul className="max-md:hidden md:flex-column space-y space-y-4 text-xl md:w-1/4 font-medium dark:text-gray-400 md:me-4 mb-4">
                    <li>
                        <button className={selectedTab == "Total" ?
                            props.tabTheme + " inline-flex px-4 py-3 rounded-lg text-white active w-full " + props.borderTheme
                                :
                            "inline-flex px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white " + props.borderTheme
                        }
                        onClick = {() => setSelectedTab("Total")}>
                            Total
                        </button>
                    </li>
                    {levels.map((entry, idx) => {
                        return(
                            <li>
                                <button className={selectedTab == idx ?
                                    props.tabTheme + " inline-flex px-4 py-3 rounded-lg text-white active w-full " + props.borderTheme
                                        :
                                    "inline-flex px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white " + props.borderTheme
                                }
                                onClick = {() => setSelectedTab(idx)}>
                                    Ascension {idx + 1} &#x28;{capitalize(levels[idx].replace('_', ' '))}&#x29;
                                </button>
                            </li>
                        )
                    })}
                </ul>
                
                {/* Mobile Tabs */}
                <div className="md:hidden p-4" >
                    <form className="max-w-sm mx-auto">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                        <select className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500
                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                            setSelectedTab(e.target.value)
                        }}>
                            <option value="Total" selected>Total</option>
                            <option value="0">Ascension 1 (Level 20)</option>
                            <option value="1">Ascension 2 (Level 40)</option>
                            <option value="2">Ascension 3 (Level 50)</option>
                            <option value="3">Ascension 4 (Level 60)</option>
                            <option value="4">Ascension 5 (Level 70)</option>
                            <option value="5">Ascension 6 (Level 80)</option>
                        </select>
                    </form>
                </div>

                {/* Body */}
                <div className= {props.cardColor + "p-4 text-medium text-gray-500 dark:text-gray-200 rounded-lg w-full"}>
                    {selectedTab == "Total" ?  
                        <div className = "flex flex-wrap">
                            {totalMaterials.map(entry => {
                                return(
                                    <div className= "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-3">
                                        <div className= {props.cardColor + " relative border border-solid border-white rounded-3xl"}>
                                            <div className= {props.quantityTheme + 
                                            " bottom-0 right-0 z-10 px-3 py-1 text-2xl dark:text-white from-transparent bg-gradient-to-br rounded-br-3xl rounded-tl-3xl font-bold absolute"}>{entry["value"]}</div>
                                            <img src = {itemImage(entry["name"])}/>
                                        </div>
                                        <p>{entry["name"]}</p>
                                    </div>
                                )
                            })}
                        </div> :
                        <div>
                            {levels.map((entry, idx) => {
                                return(
                                    <div className = "flex flex-wrap">
                                        {props.data[entry].map(lvl => {
                                            if (selectedTab == idx) {
                                                return(
                                                    <div className= "w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-3">
                                                        <div className= {props.cardColor + " relative border border-solid border-white rounded-3xl"}>
                                                            <div className = {props.quantityTheme + " bottom-0 right-0 z-10 px-3 py-1 text-2xl dark:text-white from-transparent bg-gradient-to-br rounded-br-3xl rounded-tl-3xl font-bold absolute"}>{lvl["value"]}</div>
                                                            <img src = {itemImage(lvl["name"])}/>
                                                        </div>
                                                        <p> {lvl["name"]}</p>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            })}       
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AscensionMaterials