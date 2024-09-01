import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Constellation from './Constellation'
import PassiveTalents from './PassiveTalents'
import Sidebar from './Sidebar'
import Factions from './Factions'
import SkillTalents from './SkillTalents'
import Keywords from './Keywords'
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
            "Keyword-Text" : "text-lime-300",
            "About" : "bg-lime-600",
            "Constellation" : "bg-lime-700",
            "Passive-Talents" : "bg-lime-900",
            "Skill-Talents" : "bg-lime-950",
            "Icon-High" : "to-lime-300",
            "Icon-Low" : "from-lime-800"
        },
        "Pyro" : {
            "Keyword-Text" : "text-red-300",
            "About" : "bg-red-500",
            "Constellation" : "bg-red-700",
            "Passive-Talents" : "bg-red-900",
            "Skill-Talents" : "bg-red-950",
            "Icon-High" : "to-red-300",
            "Icon-Low" : "from-red-800"
        },
        "Hydro" : {
            "Keyword-Text" : "text-blue-300",
            "About" : "bg-blue-500",
            "Constellation" : "bg-blue-700",
            "Passive-Talents" : "bg-blue-900",
            "Skill-Talents" : "bg-blue-950",
            "Icon-High" : "to-blue-300",
            "Icon-Low" : "from-blue-800"
        },
        "Electro" : {
            "Keyword-Text" : "text-purple-300",
            "About" : "bg-purple-500",
            "Constellation" : "bg-purple-700",
            "Passive-Talents" : "bg-purple-900",
            "Skill-Talents" : "bg-purple-950",
            "Icon-High" : "to-purple-300",
            "Icon-Low" : "from-purple-800"
        },
        "Anemo" : {
            "Keyword-Text" : "text-teal-300",
            "About" : "bg-teal-500",
            "Constellation" : "bg-teal-700",
            "Passive-Talents" : "bg-teal-900",
            "Skill-Talents" : "bg-teal-950",
            "Icon-High" : "to-teal-300",
            "Icon-Low" : "from-teal-800"
        },
        "Geo" : {
            "Keyword-Text" : "text-amber-300",
            "About" : "bg-amber-500",
            "Constellation" : "bg-amber-700",
            "Passive-Talents" : "bg-amber-900",
            "Skill-Talents" : "bg-amber-950",
            "Icon-High" : "to-amber-300",
            "Icon-Low" : "from-amber-800"
        },
        "Cryo" : {
            "Keyword-Text" : "text-cyan-300",
            "About" : "bg-cyan-500",
            "Constellation" : "bg-cyan-700",
            "Passive-Talents" : "bg-cyan-900",
            "Skill-Talents" : "bg-cyan-950",
            "Icon-High" : "to-cyan-300",
            "Icon-Low" : "from-cyan-800"
        }
    }
    // const colors2 = {
    //     "Dendro" : "bg-lime-500",
    //     "Pyro" : ,
    //     "Hydro" : ,
    //     "Electro" : ,
    //     "Anemo" : ,
    //     "Geo" : ,
    //     "Cryo" : 
    // }
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
            <div id="/" className="lg:hidden space-y-2 p-4 items-center border border-gray-200 rounded-lg bg-cover bg-center h-screen" style={{backgroundImage: `url('${images["namecard-background"]}')`}}>
                <div className = "my-7 flex items-center justify-center">
                    <img className = "rounded-lg " src={icon}></img>
                </div>
                <div className="p-2 items-start justify-start text-start">
                    <h1 className="dark:text-white text-gray-500 text-5xl md:text-9xl">{props.charPreviewData.name}</h1>
                    <p className="dark:text-white italic text-gray-500 text-2xl">{props.charPreviewData.title}</p>
                    <h2 className="mb-2 text-sm font-bold text-gray-500 dark:text-white">{props.charPreviewData.description}</h2>
                </div>
                <div className="flex space-x-5 justify-between">
                    <button className= "w-full h-20 rounded-full bg-slate-800" onClick = {() => document.getElementById('Factions')?.scrollIntoView({behavior: 'smooth'})}>Factions</button>
                    <button className= "w-full h-20 rounded-full bg-slate-800" onClick = {() => document.getElementById('Constellation')?.scrollIntoView({behavior: 'smooth'})}>Constellation</button>
                </div>
                <div className="flex space-x-5 justify-between">
                    <button className= "w-full h-20 rounded-full bg-slate-800" onClick = {() => document.getElementById('Passive Talents')?.scrollIntoView({behavior: 'smooth'})}>Passive Talents</button>
                    <button className= "w-full h-20 rounded-full bg-slate-800" onClick = {() => document.getElementById('Skill Talents')?.scrollIntoView({behavior: 'smooth'})}>Skill Talents</button>
                </div>
                <button className= "rounded-full bg-slate-800" onClick = {() => {
                    props.setCharPreviewData([])
                    props.setCharPreviewState(false)
                }}> Go Back </button>
            </div>

            {/* PC */}
            <div id="/" className="max-lg:hidden lg:grid lg:grid-cols-2 lg:gap-4 items-center border border-gray-200 rounded-lg bg-cover bg-center lg:h-screen" style={{backgroundImage: `url('${images["namecard-background"]}')`}}>
                <div className = "h-full min-h-screen flex items-center justify-end p-4">
                    <img className = "object-contain max-h-screen" src={card}></img>
                </div>
                <div className="items-start justify-start text-left mr-10">
                    {/* <button onClick = {() => console.log(props.charPreviewData)}>char prev data</button> */}
                    <h1 className="dark:text-white text-gray-500 text-9xl">{props.charPreviewData.name}</h1>
                    <p className="dark:text-white italic text-gray-500 text-2xl">{props.charPreviewData.title}</p>
                    <h2 className="mb-2 text-3xl font-bold text-gray-500 dark:text-white">{props.charPreviewData.description}</h2>
                    <div className="space-x-5">
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 dark:text-white" onClick = {() => document.getElementById('Factions')?.scrollIntoView({behavior: 'smooth'})}>
                            <div class="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-2xl">
                                Factions
                            </span>
                        </button>
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 dark:text-white" onClick = {() => document.getElementById('Constellation')?.scrollIntoView({behavior: 'smooth'})}>
                            <div class="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-2xl">
                                Constellation
                            </span>
                        </button>
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 dark:text-white" onClick = {() => document.getElementById('Passive Talents')?.scrollIntoView({behavior: 'smooth'})}>
                            <div class="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-2xl">
                                Passive Talents
                            </span>
                        </button>
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 dark:text-white" onClick = {() => document.getElementById('Skill Talents')?.scrollIntoView({behavior: 'smooth'})}>
                            <div class="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-2xl">
                                Skill Talents
                            </span>
                        </button>
                        <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 dark:text-white" onClick = {() => {
                            document.getElementById('Skill Talents')?.scrollIntoView({behavior: 'smooth'})
                            props.setCharPreviewData([])
                            props.setCharPreviewState(false)
                            window.scrollTo(0, 0)
                        }}>
                            <div class="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="text-2xl">
                                Go Back
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* About Card */}
            <div id="Factions" className ={colors[props.charPreviewData.vision.toString()]["About"] + " md:scroll-mt-20 block lg:p-6 border border-gray-200 rounded-lg gap-4"}>

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
                />                
            </div>

             {/*Constellation  */}
            <div id="Constellation" className = {colors[props.charPreviewData.vision.toString()]["Constellation"] + " md:scroll-mt-20 block lg:p-6 border border-gray-200 rounded-lg gap-4"}>   
                <Constellation
                    images = {images}
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    constellationName = {props.charPreviewData.constellation}
                    constellationLevel = {props.charPreviewData.constellations}

                />
            </div>

            {/* Passive Talents */}
            <div id="Passive Talents" className = {colors[props.charPreviewData.vision.toString()]["Passive-Talents"] + " md:scroll-mt-20 block lg:p-6 border border-gray-200 rounded-lg gap-4"}> 
                <PassiveTalents 
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    images = {images}
                    passiveTalents = {props.charPreviewData.passiveTalents}   
                />
            </div>

            {/* Skill Talents */}
            <div id="Skill Talents" className = {colors[props.charPreviewData.vision.toString()]["Skill-Talents"] + " md:scroll-mt-20 dark:text-white block lg:p-6 border border-gray-200 rounded-lg gap-4"}> 
                <SkillTalents 
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    images = {images}
                    skillTalents = {props.charPreviewData.skillTalents}
                />
            </div>
        </div>
    )
}

export default CharactersPreview