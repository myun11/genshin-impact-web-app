import React, { useState, useEffect } from 'react'
import axios from 'axios'
import mora from '../images/mora.webp'
const AscensionMaterials = (props) => {
    const levels = ["level_20", "level_40", "level_50", "level_60", "level_70", "level_80"]
    const [selectedTab, setSelectedTab] = useState("Total")
    const [totalMaterials, setTotalMaterials] = useState([])

    // All different types of materials. This is used for differentiating the endpoint because the images are categorized by the item's type.
    const [commonMaterials, setCommonMaterials] = useState([])
    const [localSpecialties, setLocalSpecialties] = useState([])
    const [gemMaterials, setGemMaterials] = useState([])
    const [bossMaterials, setBossMaterials] = useState([])

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
            <h1 className = "font-bold p-4 text-4xl md:text-5xl">Ascension Materials</h1>
            <div class="md:flex">
                {/* PC Tabs */}
                <ul class="max-md:hidden md:flex-column space-y space-y-4 text-xl md:w-1/4 font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    <li>
                        <button class={selectedTab == "Total" ?
                            "inline-flex items-center px-4 py-3 rounded-lg text-white bg-blue-700  active w-full dark:bg-blue-600"
                                :
                            "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                        } aria-current="page"
                        onClick = {() => setSelectedTab("Total")}>
                            Total
                        </button>
                    </li>
                    {levels.map((entry, idx) => {
                        return(
                            <li>
                                <button class={selectedTab == idx ?
                                    "inline-flex items-center px-4 py-3 rounded-lg text-white bg-blue-700  active w-full dark:bg-blue-600"
                                        :
                                    "inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                                } aria-current="page"
                                onClick = {() => setSelectedTab(idx)}>
                                    Ascension {idx + 1}
                                </button>
                            </li>
                        )
                    })}
                </ul>
                
                {/* Mobile Tabs */}
                <div class="md:hidden text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px">
                        <li class="me-2">
                            <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Total</button>
                        </li>
                        <li class="me-2">
                            <button class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Ascension 1</button>
                        </li>
                        <li class="me-2">
                            <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Ascension 2</button>
                        </li>
                        <li class="me-2">
                            <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Ascension 3</button>
                        </li>
                        <li>
                            <button class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</button>
                        </li>
                    </ul>
                </div>

                {/* Body */}
                <div class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    {   selectedTab == "Total" ?  
                            <div className = "md:flex md:flex-wrap">
                                {totalMaterials.map(entry => {
                                    return(
                                        <div className= "w-1/2 md:w-1/6 p-3">
                                            <div className="relative border border-solid border-white rounded-3xl">
                                                <div className= "bottom-0 right-0 z-10 px-3 py-1 text-lg dark:text-white to-sky-500 from-transparent bg-gradient-to-br rounded-br-3xl rounded-tl-3xl font-bold absolute">{entry["value"]}</div>
                                                <img className = "" src = {itemImage(entry["name"])}/>
                                            </div>
                                            <p>{entry["name"]}</p>
                                        </div>
                                    )
                                })}
                            </div> :
                            <div >
                                {levels.map((entry, idx) => {
                                    return(
                                        <div className = "md:flex md:flex-wrap">
                                            {props.data[entry].map(lvl => {
                                                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Ascension {idx + 1} Materials</h3>
                                                if (selectedTab == idx) {
                                                    return(
                                                        <div className= "w-1/2 md:w-1/6 p-3">
                                                            <div className="relative border border-solid border-white rounded-3xl">
                                                                <div className= "bottom-0 right-0 z-10 px-3 py-1 text-lg dark:text-white to-sky-500 from-transparent bg-gradient-to-br rounded-br-3xl rounded-tl-3xl font-bold absolute">{lvl["value"]}</div>
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