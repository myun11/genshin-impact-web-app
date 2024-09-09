import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Transition } from '@headlessui/react';
import WeaponPreview from './WeaponPreview';
import Loader from './Loader'

const Weapons = () => {

    const [weapons, setWeapons] = useState([])
    const [filteredWeapons, setFilteredWeapons] = useState([])
    const [loading, setLoading] = useState(true)
    const [weaponSearch, setWeaponSearch] = useState("")
    const [weaponPreviewState, setWeaponPreviewState] = useState(false)
    const [selectedWeapon, setSelectedWeapon] = useState([])

    const fetchData = async () => {
        try{
            await axios.get('https://genshin.jmp.blue/weapons')
            .then(res => {
                res.data.map(async weapon => {
                    if (weapon != "sword-of-narzissenkreuz") { // Until API is updated.
                        try {
                            await axios.get('https://genshin.jmp.blue/weapons/' + weapon)
                            .then(res2 => {

                                // This method updates state better than the method below.
                                setWeapons(wep => [...wep, {
                                    'id' : weapon,
                                    'data' : res2.data,
                                    'icon' : 'https://genshin.jmp.blue/weapons/' + weapon + '/icon'
                                }])
                                setFilteredWeapons(wep => [...wep, {
                                    'id' : weapon,
                                    'data' : res2.data,
                                    'icon' : 'https://genshin.jmp.blue/weapons/' + weapon + '/icon'
                                }])
                            })
                        } catch (error) {
                            console.log("Error getting weapon data: ", error)
                        }
                    }
                })
                // const array = []
                // res.data.map(async weapon => {
                //     if (weapon != "sword-of-narzissenkreuz") { // Until API is updated.
                //         try {
                //             await axios.get('https://genshin.jmp.blue/weapons/' + weapon)
                //             .then(res2 => {
                //                 // console.log("testing :",  res2.data)
                //                 array.push({
                //                     'id' : weapon,
                //                     'data' : res2.data,
                //                     'icon' : 'https://genshin.jmp.blue/weapons/' + weapon + '/icon'
                //                 })
                //             })
                //         } catch (error) {
                //             console.log("Error getting weapon data: ", error)
                //         }
                //     }
                // })
                // setWeapons(array)
            })
            .then(() => setLoading(false))
          } catch (error) {
            console.log("Error getting weapons names: ", error)
          }
    }

    const options = {
        types :  [
            { value: 'Sword', label: 'Sword' },
            { value: 'Bow', label: 'Bow' },
            { value: 'Claymore', label: 'Claymore' },
            { value: 'Polearm', label: 'Polearm' },
            { value: 'Catalyst', label: 'Catalyst' }
        ],
        subStats : [
            { value: 'ATK,Attack', label: 'ATK' },
            { value: 'Elemental Mastery', label: 'Elemental Mastery' },
            { value: 'CRIT DMG', label: 'CRIT DMG' },
            { value: '-', label: 'N/A' },
            { value: 'HP', label: 'HP' },
            { value: 'DEF', label: 'DEF' },
            { value: 'Energy Recharge', label: 'Energy Recharge' },
            { value: 'CRIT Rate', label: 'CRIT Rate' },
            { value: 'Physical DMG Bonus', label: 'Physical DMG Bonus' }
        ],
        rarity : [
            { value: 1, label: '1*' },
            { value: 2, label: '2*' },
            { value: 3, label: '3*' },
            { value: 4, label: '4*' },
            { value: 5, label: '5*' },
        ]
    };

      
    const [selectedOptions, setSelectedOptions] = useState({
        types : [],
        subStats : [],
        rarity : []
    });


    const toggleOptionTypes = (option) => {
        setSelectedOptions((prev) =>
            prev.types.includes(option)
            ? {
             types : [...prev.types.filter((o) => o !== option)],
             subStats : [...prev.subStats],
             rarity : [...prev.rarity]   
            }
            : {
                types : [...prev.types, option],
                subStats : [...prev.subStats],
                rarity : [...prev.rarity]   
               }
        );
    };
    const toggleOptionSubstats = (option) => {
        setSelectedOptions((prev) =>
            prev.subStats.includes(option)
            ? {
             types : [...prev.types],
             subStats : [...prev.subStats.filter((o) => o !== option)],
             rarity : [...prev.rarity]   
            }
            : {
                types : [...prev.types],
                subStats : [...prev.subStats, option],
                rarity : [...prev.rarity]   
               }
        );
    };
    const toggleOptionRarity = (option) => {
        setSelectedOptions((prev) =>
            prev.rarity.includes(option)
            ? {
             types : [...prev.types],
             subStats : [...prev.subStats],
             rarity : [...prev.rarity.filter((o) => o !== option)]   
            }
            : {
                types : [...prev.types],
                subStats : [...prev.subStats],
                rarity : [...prev.rarity, option]   
               }
        );
    };

    // const [isTypesOpen, setIsTypesOpen] = useState(false);
    // const [isSubstatsOpen, setIsSubstatsOpen] = useState(false);
    // const [isRarityOpen, setIsRarityOpen] = useState(false);

    // const [isOpen, setIsOpen] = useState({
    //     types : false,
    //     subStats : false,
    //     rarity : false
    // });

    // const handleDropdownClick = (field) => {
    //     if (field == "types") {
    //         setIsOpen(prev => {return({ 
    //             "types" : !prev.types,
    //             "subStats" : prev.subStats,
    //             "rarity" : prev.rarity
    //         })});
    //     }
    //     if (field == "subStats") {
    //         setIsOpen(prev => {return({ 
    //             "types" : prev.types,
    //             "subStats" : !prev.subStats,
    //             "rarity" : prev.rarity
    //         })});
    //     }
    //     if (field == "rarity") {
    //         setIsOpen(prev => {return({ 
    //             "types" : prev.types,
    //             "subStats" : prev.subStats,
    //             "rarity" : !prev.rarity
    //         })});
    //     }
    // };

    // Handles visibility of dropdown filters.
    const [isOpen, setIsOpen] = useState("")
    const handleDropdownClick = (field) => {
        if (isOpen == field) {
            setIsOpen("")
        } else {
            setIsOpen(field)
        }
    }
    const wrapperRef = useRef();
    useEffect(() => {
        const closeDropdown = e => {
            if (!wrapperRef.current.contains(e.target)) {
                setIsOpen("");
            }
        }
        document.body.addEventListener('click', closeDropdown)
        return () => document.body.removeEventListener('click', closeDropdown)
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    // Whenever a filter is selected, the filteredWeapons array is rerendered
    useEffect(() => {
        let filteredArray = weapons

        // Filters out type
        if (selectedOptions.types.length > 0) {
            filteredArray = filteredArray.filter(entry => {
                return(selectedOptions.types.includes(entry.data.type))
            })
        }

        // ATK value is "ATK,attack" because the API is messy so account for both.
        const copy = []
        selectedOptions.subStats.map(entry => {
            if (entry == "ATK,Attack") {
                copy.push("ATK")
                copy.push("Attack")
            } else {
                copy.push(entry)
            }
        })

        // Filters out substat
        if (selectedOptions.subStats.length > 0) {
            filteredArray = filteredArray.filter(entry => {
                return(copy.includes(entry.data.subStat))
            })
        }

        // Filters out rarity
        if (selectedOptions.rarity.length > 0) {
            filteredArray = filteredArray.filter(entry => {
                return(selectedOptions.rarity.includes(entry.data.rarity))
            })
        }

        // Filters out the search input
        if (weaponSearch.length > 0) {
            filteredArray = filteredArray.filter(entry => {
                return(entry.data.name.toLowerCase().includes(weaponSearch.toLowerCase()))
            })
        }
        setFilteredWeapons(filteredArray)
        
    }, [weapons, selectedOptions, weaponSearch])
    return(
        <div className = "p-4 mx-auto min-h-screen">
            <div className="h-20"></div>

            {weaponPreviewState ? 
                <div>
                            <WeaponPreview
                                wep = {selectedWeapon}
                                setWeaponPreviewState={setWeaponPreviewState}
                            />
                </div> :
                <div>
                    <h1 className="text-black dark:text-white">Weapons</h1>
                    {loading ? 
                        <div>
                            <Loader 
                                loading = {loading}
                            />
                        </div>
                    :
                        <div className = "">

                        <div className = "p-4 ">
                            <div className = "bg-black dark:bg-slate-500 h-1 w-full"></div>
                            <div className = "lg:inline-flex content-start m-4 p-4 lg:space-x-7 flex max-lg:flex-col max-lg:space-y-4 items-center justify-center" ref={wrapperRef}>
                                {/* Weapon type multiselect  */}
                                <div className="relative w-64" >
                                    <div
                                        className="border border-gray-300 rounded-md p-2 cursor-pointer"
                                        onClick={() => handleDropdownClick("types")}
                                    >
                                        {selectedOptions.types.length > 0 ? (
                                        selectedOptions.types.map((option) => (
                                            <span
                                            key={option}
                                            className="inline-block bg-gray-500 text-white text-sm rounded-md px-2 py-1 mr-1 mb-1"
                                            >
                                            {options.types.find((o) => o.value === option).label}
                                            </span>
                                        ))
                                        ) : (
                                        <span className="text-gray-500">Select Types</span>
                                        )}
                                    </div>

                                    <Transition
                                        show={isOpen == "types"}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <div className="absolute mt-2 w-full  bg-slate-500 border border-gray-300 rounded-md shadow-lg z-10">
                                            {options.types.map((option) => (
                                                <div
                                                key={option.value}
                                                className={`text-left cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                                    selectedOptions.types.includes(option.value) ? 'bg-blue-100' : ''
                                                }`}
                                                onClick={() => toggleOptionTypes(option.value)}
                                                >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOptions.types.includes(option.value)}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </Transition>
                                </div>

                                {/* Weapon substat multiselect  */}
                                <div className="relative w-64" >
                                    <div
                                        className="border border-gray-300 rounded-md p-2 cursor-pointer"
                                        onClick={() => handleDropdownClick("subStats")}
                                    >
                                        {selectedOptions.subStats.length > 0 ? (
                                        selectedOptions.subStats.map((option) => (
                                            <span
                                            key={option}
                                            className="inline-block bg-gray-500 text-white text-sm rounded-md px-2 py-1 mr-1 mb-1"
                                            >
                                            {options.subStats.find((o) => o.value === option).label}
                                            </span>
                                        ))
                                        ) : (
                                        <span className="text-gray-500">Select Substats</span>
                                        )}
                                    </div>

                                    <Transition
                                        show={isOpen == "subStats"}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <div className="absolute mt-2 w-full bg-slate-500 border border-gray-300 rounded-md shadow-lg z-10">
                                            {options.subStats.map((option) => (
                                                <div
                                                key={option.value}
                                                className={`text-left cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                                    selectedOptions.subStats.includes(option.value) ? 'bg-blue-100' : ''
                                                }`}
                                                onClick={() => toggleOptionSubstats(option.value)}
                                                >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOptions.subStats.includes(option.value)}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </Transition>
                                </div>

                                {/* Weapon rarity multiselect */}
                                <div className="relative w-64" >
                                    <div
                                        className="border border-gray-300 rounded-md p-2 cursor-pointer"
                                        onClick={() => handleDropdownClick("rarity")}
                                    >
                                        {selectedOptions.rarity.length > 0 ? (
                                        selectedOptions.rarity.map((option) => (
                                            <span
                                            key={option}
                                            className="inline-block bg-gray-500 text-white text-sm rounded-md px-2 py-1 mr-1 mb-1"
                                            >
                                            {options.rarity.find((o) => o.value === option).label}
                                            </span>
                                        ))
                                        ) : (
                                        <span className="text-gray-500">Select Rarity</span>
                                        )}
                                    </div>

                                    <Transition
                                        show={isOpen == "rarity"}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <div className="absolute mt-2 w-full bg-slate-500 border border-gray-300 rounded-md shadow-lg z-10">
                                            {options.rarity.map((option) => (
                                                <div
                                                key={option.value}
                                                className={`text-left cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                                    selectedOptions.rarity.includes(option.value) ? 'bg-blue-100' : ''
                                                }`}
                                                onClick={() => toggleOptionRarity(option.value)}
                                                >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOptions.rarity.includes(option.value)}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </Transition>
                                </div>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 
                                focus:border-blue-500 max-lg:w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                 dark:focus:ring-blue-500 dark:focus:border-blue-500" id="weapon-search" type = "string" placeholder='Search Weapon' onChange = {(e) => setWeaponSearch(e.target.value)}/>
                            </div>
                            <div className = "bg-black dark:bg-slate-500 h-1 w-full"></div>
                        </div>
                        {
                            filteredWeapons.length > 0 ? <div className = "lg:h-5/6 lg:w-5/6 mx-auto grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 ">
                            {filteredWeapons.map(entry => {
                                if (entry.data.rarity == 1) {
                                    return(
                                        <div className = "border-4 border-black dark:border-white w-full h-full box rounded-lg hover:bg-gray-500 hover:border-gray-500 transition duration-300 ease-in-out">
                                            <button className = "bg-gradient-to-b from-gray-500 to-white" onClick = {() => {
                                                setSelectedWeapon(entry)
                                                setWeaponPreviewState(true)
                                            }} >
                                                <img className="bg-cover w-60 h-60 rounded-lg " src = {entry.icon} onClick = {() => {
                                            }}/></button>
                                            <h2 className = "capitalize text-black dark:text-white">{entry.data.name}</h2>
                                        </div>
                                    )
                                }
                                if (entry.data.rarity == 2) {
                                    return(
                                        <div className = "border-4 border-black dark:border-white w-full h-full box rounded-lg hover:bg-green-500 hover:border-green-500 transition duration-300 ease-in-out">
                                            <button className = "bg-gradient-to-b from-green-500 to-white" onClick = {() => {
                                                setSelectedWeapon(entry)
                                                setWeaponPreviewState(true)
                                            }}>
                                                <img className="bg-cover w-60 h-60 rounded-lg " src = {entry.icon} onClick = {() => {
                                            
                                            }}/></button>
                                            <h2 className = "capitalize text-black dark:text-white">{entry.data.name}</h2>
                                        </div>
                                    )
                                }
                                if (entry.data.rarity == 3) {
                                    return(
                                        <div className = "border-4 border-black dark:border-white w-full h-full box rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-300 ease-in-out">
                                            <button className = "bg-gradient-to-b from-blue-500 to-white" onClick = {() => {
                                                setSelectedWeapon(entry)
                                                setWeaponPreviewState(true)
                                            }}>
                                                <img className="bg-cover w-60 h-60 rounded-lg " src = {entry.icon} onClick = {() => {
                                            
                                            }}/></button>
                                            <h2 className = "capitalize text-black dark:text-white">{entry.data.name}</h2>
                                        </div>
                                    )
                                }
                                if (entry.data.rarity == 4) {
                                    return(
                                        <div className = "border-4 border-black dark:border-white w-full h-full box rounded-lg hover:bg-purple-500 hover:border-purple-500 transition duration-300 ease-in-out">
                                            <button className = "bg-gradient-to-b from-purple-500 to-white" onClick = {() => {
                                                setSelectedWeapon(entry)
                                                setWeaponPreviewState(true)
                                            }}>
                                                <img className="bg-cover w-60 h-60 rounded-lg " src = {entry.icon} onClick = {() => {
                                            
                                            }}/></button>
                                            <h2 className = "capitalize text-black dark:text-white">{entry.data.name}</h2>
                                        </div>
                                    )
                                }
                                if (entry.data.rarity == 5) {
                                    return(
                                        <div className = "border-4 border-black dark:border-white w-full h-full box rounded-lg hover:bg-orange-500 hover:border-orange-500 transition duration-300 ease-in-out">
                                            <button className = "bg-gradient-to-b from-orange-500 to-white" onClick = {() => {
                                                setSelectedWeapon(entry)
                                                setWeaponPreviewState(true)
                                            }}>
                                                <img className="bg-cover w-60 h-60 rounded-lg " src = {entry.icon} onClick = {() => {
                                            
                                            }}/></button>
                                            <h2 className = "capitalize text-black dark:text-white">{entry.data.name}</h2>
                                        </div>
                                    )
                                }
                            })}                
                        </div>
                        : <div>
                            <p className="text-black dark:text-white flex items-center justify-center md:text-3xl p-8">No weapons match.</p>
                        </div>
                        }
                        </div>
                    }
            </div>
        }
    </div>    
    )
    
}

export default Weapons