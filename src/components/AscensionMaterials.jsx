import React, { useState, useEffect } from 'react'

const AscensionMaterials = (props) => {
    const levels = ["level_20", "level_40", "level_50", "level_60", "level_70", "level_80"]
    const [selectedTab, setSelectedTab] = useState("Total")
    const [totalMaterials, setTotalMaterials] = useState([])

    // Used for taking the total materials from all ascension levels
    const sumMaterials = (materials) => {
        const reduced = Object.values(materials).flat().reduce((acc, item) => {
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
        try {
            const itemName = item.toLowerCase().replaceAll(' ', '-').replaceAll("'", '-')
            let endpoint = ""
            if (itemName.includes("vayuda") ||
                itemName.includes("shivada") ||
                itemName.includes("vajrada") ||
                itemName.includes("prithiva") ||
                itemName.includes("varunada") ||
                itemName.includes("agnidus") ||
                itemName.includes("nagadus") ||
                itemName.includes("brilliant")) {
                endpoint = 'https://genshin.jmp.blue/materials/character-ascension/' + itemName
            } else if (itemName.includes == "") {
                endpoint = 'https://genshin.jmp.blue/materials/local-specialties/' + itemName
            } else {
                endpoint = 'https://genshin.jmp.blue/materials/common-ascension/' + itemName
            }
            console.log("endpoint ", endpoint)
            return endpoint
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    useEffect(() => {
        setTotalMaterials(sumMaterials(props.data))
    }, [])
    return (
        <div>
            <h1 className = "font-bold p-4">Ascension Materials</h1>
            <button onClick = {() => console.log(totalMaterials)}>total mats</button>
            <div class="md:flex">
                <ul class="flex-column space-y space-y-4 text-xl w-1/4 font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
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
                <div class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    {   selectedTab == "Total" ?  
                            <div>
                                {totalMaterials.map(entry => {
                                    return(
                                        <div>
                                            <img src = {itemImage(entry["name"])}/>
                                            Material: {entry["name"]}
                                            Amount: {entry["value"]}
                                        </div>
                                    )
                                })}
                            </div> :
                            <div>
                                {levels.map((entry, idx) => {
                                    return(
                                        <div>
                                            {props.data[entry].map(lvl => {
                                                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Ascension {idx + 1} Materials</h3>
                                                if (selectedTab == idx) {
                                                    return(
                                                        <div>
                                                            Material: {lvl["name"]}
                                                            Amount: {lvl["value"]}
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


            <button onClick = {() => console.log(props.data)}>data</button>
        </div>
    )
}

export default AscensionMaterials