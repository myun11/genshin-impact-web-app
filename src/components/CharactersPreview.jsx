import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
const CharactersPreview = (props) => {
    const [card, setCard] = useState([])
    const [loading, setLoading] = useState(true)
    const [vision, setVision] = useState("")
    const [birthday, setBirthday] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [skillImages, setSkillImages] = useState([])

    // Helper function for converting birthday and release date data from api to a readable string.
    const convertDates = () => {
        let temp_birthday = moment(props.charPreviewData.birthday, "YYYY-MM-DD").format("MMMM D")
        let temp_release = moment(props.charPreviewData.release, "YYYY-MM-DD").format("MMMM D YYYY")
        setBirthday(temp_birthday)
        setReleaseDate(temp_release)
    }
    
    // Setting up dict for the varying background colors.
    let vision_css = {}
    function fillDict() {
        vision_css['Pyro'] =   'w-screen bg-gradient-to-b from-red-400 to-black'
        vision_css['Geo'] =    'w-screen bg-gradient-to-b from-orange-400 to-black'
        vision_css['Dendro'] = 'w-screen bg-gradient-to-b from-green-400 to-black'
        vision_css['Electro'] ='w-screen bg-gradient-to-b from-purple-400 to-black'
        vision_css['Hydro'] =  'w-screen bg-gradient-to-b from-blue-400 to-black'
        vision_css['Anemo'] =  'w-screen bg-gradient-to-b from-teal-400 to-black'
        vision_css['Cryo'] =   'w-screen bg-gradient-to-b from-cyan-400 to-black'
    }
    const getCharacterImage = async (char) => {
        
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

    const getSkillImages = (char) => {
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
            "talent-passive-2": "https://genshin.jmp.blue/characters/" +char.toLowerCase() + "/talent-passive-2"            
        }

        setSkillImages(data)
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
        getSkillImages(props.charPreviewData.id)
        // getCharacterImage(props.charPreviewData.name)
        fillDict()
        setVision(vision_css[props.charPreviewData.vision])
        setLoading(false)
        convertDates()
        // setCard("https://genshin.jmp.blue/characters/" + props.charPreviewData.id + "/card")
    },[vision_css, vision])
    
    if (loading) {
        return (
            <div>
                Loading
            </div>
        )
    }
    return (
        <div className={vision} >
            
            <button onClick = {() => {
                props.setCharPreviewData([])
                props.setCharPreviewState(false)
            }}> Go Back </button>

            {/* Top section divided into two columns */}
            
            <div className = "items-center justify-center grid grid-cols-2 gap-4">
                <div className = "flex items-center justify-center">
                    <img className = "w-1/2" src={card}></img>
                </div>
                <div>
                    <h1 className="text-9xl m-5">{props.charPreviewData.name}</h1>
                    <p className="italic font-black text-2xl">{props.charPreviewData.title}</p>
                    <div className="block max-w-full m-2 p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{props.charPreviewData.description}</h2>
                    </div>
                    {/* <p className="text-lg"> {props.charPreviewData.description}</p> */}
                    <div className = "w-full">
                        
                        <div className = "grid grid-cols-2 gap-4">
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
                    </div>
                </div>
            </div>

            

            {/* More complex content that will appear at the bottom of page. */}

            <div>
                <p>Constellation: {props.charPreviewData.constellation}</p>
                <p>Constellations (6 drop down goes here?): </p>
                <p>Passive Talents: (3 drop down goes here?): </p>
                <p>Skill Talents: (3 drop down goes here?):</p>

                <img src = {"https://genshin.jmp.blue/characters/" +props.charPreviewData.id.toLowerCase() + "/constellation-shape"}/>
                <img src = {"https://genshin.jmp.blue/characters/" +props.charPreviewData.id.toLowerCase() + "/namecard-background"}/>
                <img src={skillImages["constellation"]}/>
                <img src={skillImages["constellation-1"]}/>
                <img src={skillImages["constellation-2"]}/>
                <img src={skillImages["constellation-3"]}/>
                <img src={skillImages["constellation-4"]}/>
                <img src={skillImages["constellation-5"]}/>
                <img src={skillImages["constellation-6"]}/>
                <img src={skillImages["talent-na"]}/>
                <img src={skillImages["talent-burst"]}/>
                <img src={skillImages["talent-skill"]}/>
                <img src={skillImages["talent-passive-0"]}/>
                <img src={skillImages["talent-passive-1"]}/>
                <img src={skillImages["talent-passive-2"]}/>
                {/* <button onClick = {() => console.log(skillImages['constellation'])}>skills images</button> */}
            </div>
            
        </div>
  )
}

export default CharactersPreview