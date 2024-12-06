import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Constellation from './Constellation'
import PassiveTalents from './PassiveTalents'
import Sidebar from './Sidebar'
import Factions from './Factions'
import SkillTalents from './SkillTalents'
import Keywords from '../utility/Keywords'
import AscensionMaterials from './AscensionMaterials'

const CharactersPreview = (props) => {
    const [card, setCard] = useState([])
    const [icon, setIcon] = useState([])
    const [loading, setLoading] = useState(true)
    const [birthday, setBirthday] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [images, setImages] = useState([])
    const keywords = [...Keywords]

    const colors = {
        "Dendro" : {
            "Keyword-Text" : " text-lime-600 dark:text-lime-400 ",
            "Icon-High" : "to-lime-300",
            "Icon-Low" : "from-lime-800",
            "Ascension-Quantity" : "to-lime-500",
            "Ascension-Background" : "bg-lime-300 hover:bg-lime-400 dark:bg-lime-800 dark:hover:bg-lime-700",
            "Ascension-Border" : "hover:border-lime-600",
            "Card" : "bg-lime-300 hover:bg-lime-400 dark:bg-lime-900 dark:hover:bg-lime-800 ",
        },
        "Pyro" : {
            "Keyword-Text" : " text-red-600 dark:text-red-300",
            "Icon-High" : "to-red-300",
            "Icon-Low" : "from-red-800",
            "Ascension-Quantity" : "to-red-500",
            "Ascension-Background" : "bg-red-800",
            "Ascension-Border" : "hover:border-red-800",
            "Card" : "bg-red-300 hover:bg-red-400 dark:bg-red-900 dark:hover:bg-red-800 ",
        },
        "Hydro" : {
            "Keyword-Text" : " text-blue-700 dark:text-blue-300",
            "Icon-High" : "to-blue-300",
            "Icon-Low" : "from-blue-800",
            "Ascension-Quantity" : "to-blue-500",
            "Ascension-Background" : "bg-blue-800",
            "Ascension-Border" : "hover:border-blue-600",
            "Card" : "bg-blue-300 hover:bg-blue-400 dark:bg-blue-900 dark:hover:bg-blue-800 ",
        },
        "Electro" : {
            "Keyword-Text" : " text-purple-600 dark:text-purple-400",
            "Icon-High" : "to-violet-300",
            "Icon-Low" : "from-violet-800",
            "Ascension-Quantity" : "to-violet-500",
            "Ascension-Background" : "bg-violet-800",
            "Ascension-Border" : "hover:border-violet-600",
            "Card" : "bg-violet-300 hover:bg-violet-400 dark:bg-violet-900 dark:hover:bg-violet-800 ",
        },
        "Anemo" : {
            "Keyword-Text" : " text-teal-700 dark:text-teal-300",
            "Icon-High" : "to-teal-300",
            "Icon-Low" : "from-teal-800",
            "Ascension-Quantity" : "to-teal-500",
            "Ascension-Background" : "bg-teal-800",
            "Ascension-Border" : "hover:border-teal-600",
            "Card" : "bg-teal-300 hover:bg-teal-400 dark:bg-teal-900 dark:hover:bg-teal-800 "
        },
        "Geo" : {
            "Keyword-Text" : " text-amber-700 dark:text-amber-300",
            "Icon-High" : "to-amber-300",
            "Icon-Low" : "from-amber-800",
            "Ascension-Quantity" : "to-amber-500",
            "Ascension-Background" : "bg-amber-800",
            "Ascension-Border" : "hover:border-amber-600",
            "Card" : "bg-amber-300 hover:bg-amber-400 dark:bg-amber-900 dark:hover:bg-amber-800 "
        },
        "Cryo" : {
            "Keyword-Text" : "text-sky-700 dark:text-sky-300",
            "Icon-High" : "to-sky-300",
            "Icon-Low" : "from-sky-800",
            "Ascension-Quantity" : "to-sky-500",
            "Ascension-Background" : "bg-sky-800",
            "Ascension-Border" : "hover:border-sky-600",
            "Card" : "bg-sky-300 hover:bg-sky-400 dark:bg-sky-900 dark:hover:bg-sky-800 "
        }
    }
    
    // Helper function for converting birthday and release date data from api to a readable string.
    const convertDates = () => {
        let temp_birthday = moment(props.charPreviewData.birthday, "YYYY-MM-DD").format("MMMM D")
        let temp_release = moment(props.charPreviewData.release, "YYYY-MM-DD").format("MMMM D YYYY")
        setBirthday(temp_birthday)
        setReleaseDate(temp_release)
    }

    // Sets section colors based on the character's vision.

    const getCharacterImage = (char) => {
        
        // wanderer api
        // try {
        //     await axios.get("https://api.wanderer.moe/game/genshin-impact/splash-art/")
        //     .then(res => {
        //         // We have to modify the name from Kamisato Ayaka to kamisato-ayaka for this API.
        //         let name = char.replace(" ", "-").toLowerCase()

        //         // Traveler will show Lumine and Aether together.
        //         if (name == "traveler") {
        //             name = "lumine-nobg"
        //         }
        //         const matched = res.data.images.filter(entry => entry.name == name)
                
        //         // Since the API is unfinished, some characters only have images for either of 'name' or 'name-nobg' where -nobg means "no background"
        //         if (matched.length > 0) {
        //             setCard(matched[0]["path"])
        //         } else {
        //             setCard(res.data.images.filter(entry => entry.name == name + "-nobg")[0]["path"])
        //         }
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
        
        // genshin api
        // setCard("https://genshin.jmp.blue/characters/" + char.toLowerCase() + "/gacha-card")
        setCard("https://genshin.jmp.blue/characters/" + char.toLowerCase() + "/portrait")
        setIcon("https://genshin.jmp.blue/characters/" + char.toLowerCase() + "/icon-big")
        // setCard("https://genshin.jmp.blue/characters/" + char.toLowerCase() + "/gacha-splash")
    }

    const callAPI = (char) => {
        let data = {
            "constellation": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation",
            "constellation-1": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-1",
            "constellation-2": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-2",
            "constellation-3": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-3",
            "constellation-4": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-4",
            "constellation-5": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-5",
            "constellation-6": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-6",
            "talent-na": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/talent-na",
            "talent-skill": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/talent-skill",
            "talent-burst": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/talent-burst",
            "talent-passive-0": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/talent-passive-0",
            "talent-passive-1": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/talent-passive-1",
            "talent-passive-2": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/talent-passive-2",            
            "namecard-background": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/namecard-background",
            "constellation-shape": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-shape"            
        }

        setImages(data)
        // try {
        //     await axios.all([
        //         axios.get("https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation"),
        //         axios.get("https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-1"),
        //         axios.get("https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-2"),
        //         axios.get("https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-3"),
        //         axios.get("https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-4"),
        //         axios.get("https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-5"),
        //         axios.get("https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/constellation-6")
        //     ]).then(axios.spread((res, res1, res2, res3, res4, res5, res6) => {
        //         // console.log("api: ", res)
        //         data =  {
        //             'constellation' : res.data,
        //             'constellation-1' : res1.data,
        //             'constellation-2' : res2.data,
        //             'constellation-3' : res3.data,
        //             'constellation-4' : res4.data,
        //             'constellation-5' : res5.data,
        //             'constellation-6' : res6.data
        //         }
        //         setSkillImages(data)

                
        //     }))
        // } catch (error) {
        //     console.log(error)
        // }
    }

    useEffect(() => {
        getCharacterImage(props.charPreviewData.id)
        callAPI(props.charPreviewData.id)
        // getCharacterImage(props.charPreviewData.name)
        setLoading(false)
        convertDates()
        // setCard("https://genshin.jmp.blue/characters/" + props.charPreviewData.id + "/card")
    
        // Pushing the characters' skill names to keywords array as well
        props.charPreviewData.skillTalents.map(entry => {
            keywords.push(entry.name)
            // console.log(entry.name)
        })
    },[])
    
    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <div className = "lg:mb-4">
            <div className="h-24"></div>
            {/* <div className="md:hidden fixed left-0 top-1/2 transform -translate-y-1/2 z-50 ">
                <ul>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#/">Art</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Factions">Factions</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Constellation">Constellation</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Passive Talents">Passive Talents</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Skill Talents">Skill Talents</a></li>
                </ul>
            </div> */}
            {/* Character Card */}
            {/* Mobile */}
            <div id="/" className="lg:hidden space-y-2 py-4 items-center rounded-lg min-h-screen">
                <div className = "my-2 flex items-center justify-center">
                    <img className = "rounded-lg " src={icon} loading="eager"/>
                </div>
                <div className="py-2 items-start justify-start text-start">
                    <h1 className="text-black dark:text-white  text-5xl md:text-7xl uppercase font-bold">{props.charPreviewData.name}</h1>
                    <p className="text-gray-500 dark:text-gray-300 italic text-2xl md:text-4xl uppercase font-bold">{props.charPreviewData.title}</p>
                    <p className="text-black dark:text-white mb-2 text-sm  md:text-xl">{props.charPreviewData.description}</p>
                </div>
                <div className="flex space-x-5 justify-between">
                    <button className= {colors[props.charPreviewData.vision]["Card"] + " md:text-3xl flex items-center justify-center border-gray-800 dark:border-white text-black dark:text-white w-full h-16 rounded-full"} onClick = {() => document.getElementById('Factions')?.scrollIntoView({behavior: 'smooth'})}>Factions</button>
                    <button className= {colors[props.charPreviewData.vision]["Card"] + " md:text-3xl flex items-center justify-center border-gray-800 dark:border-white text-black dark:text-white w-full h-16 rounded-full"} onClick = {() => document.getElementById('Constellation')?.scrollIntoView({behavior: 'smooth'})}>Constellation</button>
                </div>
                <div className="flex space-x-5 justify-between">
                    <button className= {colors[props.charPreviewData.vision]["Card"] + " md:text-3xl flex items-center justify-center border-gray-800 dark:border-white text-black dark:text-white w-full h-16 rounded-full"} onClick = {() => document.getElementById('Passive Talents')?.scrollIntoView({behavior: 'smooth'})}>Passive Talents</button>
                    <button className= {colors[props.charPreviewData.vision]["Card"] + " md:text-3xl flex items-center justify-center border-gray-800 dark:border-white text-black dark:text-white w-full h-16 rounded-full"} onClick = {() => document.getElementById('Skill Talents')?.scrollIntoView({behavior: 'smooth'})}>Skill Talents</button>
                </div>
                <button className= {colors[props.charPreviewData.vision]["Card"] + " md:text-3xl flex items-center justify-center border-gray-800 dark:border-white text-black dark:text-white w-full h-16 rounded-full"} onClick = {() => document.getElementById('Ascension Materials')?.scrollIntoView({behavior: 'smooth'})}>Ascension Materials</button>                
                <button className= {colors[props.charPreviewData.vision]["Card"] + " border-gray-800 dark:border-white text-black dark:text-white rounded-full"} onClick = {() => {
                    props.setCharPreviewData([])
                    props.setCharPreviewState(false)
                }}> Go Back </button>
            </div>

            {/* PC */}
            <div id="/" className="max-lg:hidden lg:grid lg:grid-cols-2 lg:gap-4 items-center rounded-lg bg-cover bg-center lg:h-screen">
                <div className = "h-full min-h-screen flex items-center justify-end p-4">
                    <img className = "object-contain max-h-screen" src={card} loading="eager"/>
                </div>
                <div className="items-start justify-start text-left mr-10 space-y-16">
                    <div>
                        <h1 className="dark:text-white text-black xl:text-7xl uppercase font-bold">{props.charPreviewData.name}</h1>
                        <p className="dark:text-gray-300 italic text-gray-500 text-2xl uppercase font-bold">{props.charPreviewData.title}</p>
                        <h2 className="mb-2 text-2xl text-black dark:text-white">{props.charPreviewData.description}</h2>
                    </div>
                    <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-4">
                        
                        <button className={colors[props.charPreviewData.vision]["Card"] + " w-full h-14  group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 text-black dark:text-white border border-black dark:border-white"} onClick = {() => document.getElementById('Factions')?.scrollIntoView({behavior: 'smooth'})}>
                            <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-xl">
                                Factions
                            </span>
                        </button>
                        <button className={colors[props.charPreviewData.vision]["Card"] + " w-full h-14 group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 text-black dark:text-white border border-black dark:border-white"} onClick = {() => document.getElementById('Constellation')?.scrollIntoView({behavior: 'smooth'})}>
                            <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-xl ">
                                Constellation
                            </span>
                        </button>
                        <button className={colors[props.charPreviewData.vision]["Card"] + " w-full h-14 group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 text-black dark:text-white border border-black dark:border-white"} onClick = {() => document.getElementById('Passive Talents')?.scrollIntoView({behavior: 'smooth'})}>
                            <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-xl">
                                Passive Talents
                            </span>
                        </button>
                        <button className={colors[props.charPreviewData.vision]["Card"] + " w-full h-14 group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 text-black dark:text-white border border-black dark:border-white"} onClick = {() => document.getElementById('Skill Talents')?.scrollIntoView({behavior: 'smooth'})}>
                            <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-xl">
                                Skill Talents
                            </span>
                        </button>
                        <button className={colors[props.charPreviewData.vision]["Card"] + " w-full h-14 group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 text-black dark:text-white border border-black dark:border-white"} onClick = {() => document.getElementById('Ascension Materials')?.scrollIntoView({behavior: 'smooth'})}>
                            <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-xl">
                                Ascension Materials
                            </span>
                        </button>
                        <button className={colors[props.charPreviewData.vision]["Card"] + " w-full h-14 group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 text-black dark:text-white border border-black dark:border-white"} onClick = {() => {
                            props.setCharPreviewData([])
                            props.setCharPreviewState(false)
                            window.scrollTo(0, 0)
                        }}>
                            <div className="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-xl">
                                Go Back
                            </span>
                        </button>
                    </div>
                </div>
            </div>
                        
            {/* About Card */}
            <div id="Factions" className = " scroll-mt-20 block lg:p-6 rounded-3xl gap-4">
                <Factions
                    id = {props.charPreviewData.id}
                    affiliation = {props.charPreviewData.affiliation}
                    birthday = {birthday}
                    releaseDate = {releaseDate}
                    gender = {props.charPreviewData.gender}
                    nation = {props.charPreviewData.nation}
                    rarity = {props.charPreviewData.rarity}
                    weapon = {props.charPreviewData.weapon}
                    vision = {props.charPreviewData.vision}
                    visionIconHigh = {colors[props.charPreviewData.vision]["Icon-High"]}
                    visionIconLow = {colors[props.charPreviewData.vision]["Icon-Low"]}
                    cardColor = {colors[props.charPreviewData.vision.toString()]["Card"]}
                />
            </div>

             {/* Constellation */}
            <div id="Constellation" className = {" scroll-mt-20 block lg:p-6 rounded-3xl gap-4"}>   
                <Constellation
                    images = {images}
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    constellationName = {props.charPreviewData.constellation}
                    constellationLevel = {props.charPreviewData.constellations}
                    cardColor = {colors[props.charPreviewData.vision.toString()]["Card"]}
                />
            </div>

            {/* Passive Talents */}
            <div id="Passive Talents" className = " scroll-mt-20 block lg:p-6 rounded-3xl gap-4"> 
                <PassiveTalents 
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    images = {images}
                    passiveTalents = {props.charPreviewData.passiveTalents}
                    cardColor = {colors[props.charPreviewData.vision.toString()]["Card"]}
                />
            </div>

            {/* Skill Talents */}
            <div id="Skill Talents" className = " scroll-mt-20 dark:text-white block lg:p-6 rounded-3xl gap-4">
                <SkillTalents 
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    images = {images}
                    skillTalents = {props.charPreviewData.skillTalents}
                    cardColor = {colors[props.charPreviewData.vision.toString()]["Card"]}
                    rosterData = {props.rosterData}
                    charPreviewData = {props.charPreviewData}
                />
            </div>

            {/* Ascension Materials */}
            { props.charPreviewData["ascension_materials"] &&
            <div id="Ascension Materials" className = " scroll-mt-20 dark:text-white block lg:p-6 rounded-3xl gap-4">
                <AscensionMaterials
                    data = {props.charPreviewData.ascension_materials}
                    quantityTheme = {colors[props.charPreviewData.vision]["Ascension-Quantity"]}
                    tabTheme = {colors[props.charPreviewData.vision.toString()]["Card"]}
                    borderTheme = {colors[props.charPreviewData.vision]["Ascension-Border"]}
                    itemTheme = {colors[props.charPreviewData.vision]["Passive-Talents"]}
                    cardColor = {colors[props.charPreviewData.vision.toString()]["Card"]}
                />
            </div>
            }
        </div>
    )
}

export default CharactersPreview