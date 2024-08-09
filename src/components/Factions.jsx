import React, { useEffect, useState } from 'react'
import Bow_Icon from '../images/Icon_Bow.webp'
import Catalyst_Icon from '../images/Icon_Catalyst.webp'
import Claymore_Icon from '../images/Icon_Claymore.webp'
import Polearm_Icon from '../images/Icon_Polearm.webp'
import Sword_Icon from '../images/Icon_Sword.webp'

const Factions = (props) => {
  const [visionIcon, setVisionIcon] = useState("")
  useEffect(() => {
    if (props.weapon == "Sword") {
      setVisionIcon(Sword_Icon)
    }
    if (props.weapon == "Claymore") {
      setVisionIcon(Claymore_Icon)
    }
    if (props.weapon == "Bow") {
      setVisionIcon(Bow_Icon)
    }
    if (props.weapon == "Catalyst") {
      setVisionIcon(Catalyst_Icon)
    }
    if (props.weapon == "Polearm") {
      setVisionIcon(Polearm_Icon)
    }
  }, [])
  return (
    <div>                
      <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Affiliation:</h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.affiliation}</p>
      </div>
      <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Birthday</h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.birthday}</p>
      </div>
      <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Release Date</h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.releaseDate}</p>
      </div>
      <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Gender</h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.gender}</p>
      </div>
      <div className="block max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Nation</h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.nation}</p>
      </div>

      {/* Show with icons */}

      {/* Show these other three with icons */}
      <p>Rarity: {props.rarity}</p>
      {/* <p>Vision: {props.vision}</p> */}
      <img className="rounded-lg" src = {'https://genshin.jmp.blue/characters/' + props.id + '/icon-big'}/>
      <img className="rounded-lg" src = {"https://genshin.jmp.blue/characters/" + props.id + "/gacha-card"}/>
      <div className="flex bg-black w-1/5">
        <img className="rounded-lg" src = {'https://genshin.jmp.blue/elements/' + props.vision.toLowerCase() + '/icon'} />
        <img className="rounded-lg" src = {visionIcon}/>  
      </div>
      
      {/* <p>Weapon: {props.weapon}</p> */}
      {/* <button onClick = {() => console.log(props.charPreviewData)}>props</button> */}
      {/* <p>id: {props.charPreviewData.id}</p> */}
    </div>
  )
}

export default Factions