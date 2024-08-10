import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Constellation from './Constellation'
import PassiveTalents from './PassiveTalents'
import Sidebar from './Sidebar'
import Factions from './Factions'
const CharactersPreview = (props) => {
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)
    const [birthday, setBirthday] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [images, setImages] = useState([])
    const keywords = [
        '\\d*\\.?\\d+s', // Any integer or float number followed by "s"
        'CRIT Rate',
        'CRIT DMG',
        '\\d*\\.?\\d+%', // Any integer or float number followed by "%"
        'ATK SPD',
        'Charged Attack',
        'ATK',
        'Electro',
        'Cryo',
        'Geo',
        'Hydro',
        'Dendro',
        'Anemo',
        'Pyro',
        'AoE',
        'RES',
        'Max HP',
        'HP',
        'DMG Bonus',
        'Healing Bonus',
        'DMG',
        'Charged ATK',
        'Charged Attack DMG',
        'DEF',
        '\\d',
        '\\d*\\.?\\d',
        'Normal Attack SPD',
        'Elemental Skill DMG',
        'Elemental Mastery',
        'Charged',
        'Normal Attacks',
        'attacks',
        'CD'
    ];

    const colors = {
        "Dendro" : {
            "Keyword-Text" : "text-lime-300",
            "About" : "bg-lime-600",
            "Constellation" : "bg-lime-700",
            "Passive-Talents" : "bg-lime-900",
            "Skill-Talents" : "bg-lime-950",
        },
        "Pyro" : {
            "Keyword-Text" : "text-red-300",
            "About" : "bg-red-500",
            "Constellation" : "bg-red-700",
            "Passive-Talents" : "bg-red-900",
            "Skill-Talents" : "bg-red-950"
        },
        "Hydro" : {
            "Keyword-Text" : "text-blue-300",
            "About" : "bg-blue-500",
            "Constellation" : "bg-blue-700",
            "Passive-Talents" : "bg-blue-900",
            "Skill-Talents" : "bg-blue-950"
        },
        "Electro" : {
            "Keyword-Text" : "text-purple-300",
            "About" : "bg-purple-500",
            "Constellation" : "bg-purple-700",
            "Passive-Talents" : "bg-purple-900",
            "Skill-Talents" : "bg-purple-950"
        },
        "Anemo" : {
            "Keyword-Text" : "text-teal-300",
            "About" : "bg-teal-500",
            "Constellation" : "bg-teal-700",
            "Passive-Talents" : "bg-teal-900",
            "Skill-Talents" : "bg-teal-950"
        },
        "Geo" : {
            "Keyword-Text" : "text-amber-300",
            "About" : "bg-amber-500",
            "Constellation" : "bg-amber-700",
            "Passive-Talents" : "bg-amber-900",
            "Skill-Talents" : "bg-amber-950"
        },
        "Cryo" : {
            "Keyword-Text" : "text-cyan-300",
            "About" : "bg-cyan-500",
            "Constellation" : "bg-cyan-700",
            "Passive-Talents" : "bg-cyan-900",
            "Skill-Talents" : "bg-cyan-950"
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
            console.log(keywords)
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
        <div className = "mb-4">
            <button onClick = {() => console.log(keywords)}>keywords</button>
            <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 ">
                <ul>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#/">Art</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Factions">Factions</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Constellation">Constellation</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Passive Talents">Passive Talents</a></li>
                    <li><a className="text-gray-500 hover:text-blue-500 transition" href="#Skill Talents">Skill Talents</a></li>
                </ul>
            </div>
            {/* Character Card */}
            <div id="/" className="grid grid-cols-2 gap-4 items-center mx-auto border border-gray-200 rounded-lg bg-cover bg-center h-screen" style={{backgroundImage: `url('${images["namecard-background"]}')`}}>           
                <div className = "h-full min-h-screen flex justify-end items-end p-4">
                    <img className = "object-contain max-h-screen" src={card}></img>
                </div>
                <div className="items-start justify-start text-start">
                    <button onClick = {() => {
                        props.setCharPreviewData([])
                        props.setCharPreviewState(false)
                        }}> Go Back </button>
                    {/* <button onClick = {() => console.log(props.charPreviewData)}>char prev data</button> */}
                    <h1 className="dark:text-white text-gray-500 text-9xl">{props.charPreviewData.name}</h1>
                    <p className="dark:text-white italic text-gray-500 text-2xl">{props.charPreviewData.title}</p>
                    <h2 className="mb-2 text-3xl font-bold text-gray-500 dark:text-white">{props.charPreviewData.description}</h2>
                </div>
            </div>

            {/* About Card */}
            <div id="Factions" className ={colors[props.charPreviewData.vision.toString()]["About"] + " block p-6 border border-gray-200 rounded-lg gap-4"}>

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
                />                
            </div>

             {/*Constellation  */}
            <div id="Constellation" className = {colors[props.charPreviewData.vision.toString()]["Constellation"] + " block p-6 border border-gray-200 rounded-lg gap-4"}>   
                <Constellation
                    images = {images}
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    constellationName = {props.charPreviewData.constellation}
                    constellationLevel = {props.charPreviewData.constellations}

                />
            </div>

            {/* Passive Talents */}
            <div id="Passive Talents" className = {colors[props.charPreviewData.vision.toString()]["Passive-Talents"] + " block p-6 border border-gray-200 rounded-lg gap-4"}> 
                <PassiveTalents 
                    keywords = {keywords}
                    keywordsColor = {colors[props.charPreviewData.vision.toString()]["Keyword-Text"]}
                    images = {images}
                    passiveTalents = {props.charPreviewData.passiveTalents}   
                />
            </div>

            {/* Skill Talents */}
            <div id="Skill Talents" className = {colors[props.charPreviewData.vision.toString()]["Skill-Talents"] + " dark:text-white block p-6 border border-gray-200 rounded-lg gap-4"}> 
                <h1>Skill Talents</h1>
                {props.charPreviewData.skillTalents.map(entry => {
                    return(
                        <div>
                            {entry.unlock}
                            {entry.name}
                            {entry.description}
                            Upgrades:
                            {entry.upgrades && entry.upgrades.map(obj => {
                                return(
                                    <div>
                                        <p>Name: {obj.name}</p>
                                        <p>Value: {obj.value}</p>
                                    </div>
                                )
                            })}
                            <br/>
                        </div>
                    )
                })}
                <img src={images["talent-na"]}/>
                <img src={images["talent-burst"]}/>
                <img src={images["talent-skill"]}/>
            </div>
        </div>
    )
}

export default CharactersPreview