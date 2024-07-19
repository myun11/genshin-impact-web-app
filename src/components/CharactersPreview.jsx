import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
const CharactersPreview = (props) => {
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)
    const [birthday, setBirthday] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [images, setImages] = useState([])
    const colors = {
        "Dendro" : {
            "About" : "bg-lime-600",
            "Constellation" : "bg-lime-700",
            "Passive-Talents" : "bg-lime-900",
            "Skill-Talents" : "bg-lime-950",
        },
        "Pyro" : {
            "About" : "bg-red-500",
            "Constellation" : "bg-red-700",
            "Passive-Talents" : "bg-red-900",
            "Skill-Talents" : "bg-red-950"
        },
        "Hydro" : {
            "About" : "bg-blue-500",
            "Constellation" : "bg-blue-700",
            "Passive-Talents" : "bg-blue-900",
            "Skill-Talents" : "bg-blue-950"
        },
        "Electro" : {
            "About" : "bg-purple-500",
            "Constellation" : "bg-purple-700",
            "Passive-Talents" : "bg-purple-900",
            "Skill-Talents" : "bg-purple-950"
        },
        "Anemo" : {
            "About" : "bg-teal-500",
            "Constellation" : "bg-teal-700",
            "Passive-Talents" : "bg-teal-900",
            "Skill-Talents" : "bg-teal-950"
        },
        "Geo" : {
            "About" : "bg-amber-500",
            "Constellation" : "bg-amber-700",
            "Passive-Talents" : "bg-amber-900",
            "Skill-Talents" : "bg-amber-950"
        },
        "Cryo" : {
            "About" : "bg-cyan-500",
            "Constellation" : "bg-cyan-700",
            "Passive-Talents" : "bg-cyan-900",
            "Skill-Talents" : "bg-cyan-950"
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

            {/* Character Card */}
            <div className=" block p-6 bg-white border border-gray-200 rounded-lg bg-cover bg-center h-screen min-h-screen" style={{backgroundImage: `url('${images["namecard-background"]}')`}}>
                
                {/* Top section divided into two columns */}
                <div className = "items-center justify-center grid grid-cols-2">
                    <div className = "object-contain w-full flex items-center justify-center align-middle">
                        <img className = "object-contain items-center justify-center" src={card}></img>
                    </div>
                    <div className="items-start justify-start text-start">
                        <button onClick = {() => {
                            props.setCharPreviewData([])
                            props.setCharPreviewState(false)
                            }}> Go Back </button>
                        {/* <button onClick = {() => console.log(props.charPreviewData)}>char prev data</button> */}
                        <h1 className="text-9xl m-5">{props.charPreviewData.name}</h1>
                        <p className="italic font-black text-2xl">{props.charPreviewData.title}</p>
                        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{props.charPreviewData.description}</h2>
                    </div>
                </div>
            </div>

            {/* About Card */}
            <div className ={colors[props.charPreviewData.vision.toString()]["About"] + " block p-6 border border-gray-200 rounded-lg gap-4"}>
                <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Affiliation:</h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{props.charPreviewData.affiliation}</p>
                </div>
                <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Birthday</h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{birthday}</p>
                </div>
                <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Release Date</h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{releaseDate}</p>
                </div>
                <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Gender</h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{props.charPreviewData.gender}</p>
                </div>
                <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Nation</h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{props.charPreviewData.nation}</p>
                </div>

                {/* Show with icons */}

                {/* Show these other three with icons */}
                <p>Rarity: {props.charPreviewData.rarity}</p>
                <p>Vision: {props.charPreviewData.vision}</p>
                <p>Weapon: {props.charPreviewData.weapon}</p>
                {/* <button onClick = {() => console.log(props.charPreviewData)}>props</button> */}
                {/* <p>id: {props.charPreviewData.id}</p> */}
            </div>

             {/*Constellation  */}
            <div className = {colors[props.charPreviewData.vision.toString()]["Constellation"] + " block p-6 border border-gray-200 rounded-lg gap-4"}>   
                <h1>Constellation</h1>
                <p>Constellation: {props.charPreviewData.constellation}</p>
                {props.charPreviewData.constellations.map(entry => {
                    return(
                        <div>
                            <p>Level: {entry.level}</p>
                            <p>Name: {entry.name}</p>
                            <p>Description: {entry.description}</p>
                        </div>

                    )
                })}
                <img src = {images["constellation-shape"]}/>
                <img src={images["constellation"]}/>
                <img src={images["constellation-1"]}/>
                <img src={images["constellation-2"]}/>
                <img src={images["constellation-3"]}/>
                <img src={images["constellation-4"]}/>
                <img src={images["constellation-5"]}/>
                <img src={images["constellation-6"]}/>
            </div>

            {/* Passive Talents */}
            <div className = {colors[props.charPreviewData.vision.toString()]["Passive-Talents"] + " block p-6 border border-gray-200 rounded-lg gap-4"}> 
                <h1>Passive Talents</h1>
                {props.charPreviewData.passiveTalents.map(entry => {
                    return(
                        <div>
                            {entry.unlock}
                            {entry.name}
                            {entry.description}
                        </div>
                    )
                })}
                <img src={images["talent-passive-0"]}/>
                <img src={images["talent-passive-1"]}/>
                <img src={images["talent-passive-2"]}/>
            </div>

            {/* Skill Talents */}
            <div className = {colors[props.charPreviewData.vision.toString()]["Skill-Talents"] + " block p-6 border border-gray-200 rounded-lg gap-4"}> 
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