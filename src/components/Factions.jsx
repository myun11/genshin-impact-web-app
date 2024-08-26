import React, { useEffect, useState } from 'react'
import Bow_Icon from '../images/Icon_Bow.webp'
import Catalyst_Icon from '../images/Icon_Catalyst.webp'
import Claymore_Icon from '../images/Icon_Claymore.webp'
import Polearm_Icon from '../images/Icon_Polearm.webp'
import Sword_Icon from '../images/Icon_Sword.webp'
import Star from '../images/Star.png'

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

  // function converting Rarity string into number of stars on front end.
  function convertRarity() {
    let num = parseInt(props.rarity)
    let card = []
    for (let i=0; i < num; i++) {
      card.push(
        <div>
          <img className="w-12 h-12" src = {Star}/>
        </div>
      )
    }
    return card
  }
  return (
    <div>
      <h1 className = "p-4">Factions</h1>
      <div className = "flex justify-center items-center">
        <img className="rounded-lg" src = {'https://genshin.jmp.blue/characters/' + props.id + '/icon-big'}/>
        <div className="grid">
          <div className={" justify-center h-32 items-center flex rounded-3xl bg-gradient-to-br " + props.visionIconLow + " " + props.visionIconHigh }>
            {/* Vision and Weapon type */}
            <div className = "m-2 inline-flex">
              <img className="" src = {'https://genshin.jmp.blue/elements/' + props.vision.toLowerCase() + '/icon'} />
              <img className="" src = {visionIcon}/>         
            </div>
            {/* Divider  */}
            <div className = "h-[60px]  bg-slate-600 w-[2px]">
            </div>
            {/* Rarity stars (4 or 5) */}
            <div className = "m-2 inline-flex">
              {convertRarity()}
            </div>
          </div>
          <div className="flex h-32">
            <div className="block max-w-xs p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Affiliation</h2>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.affiliation}</p>
            </div>
            <div className="block max-w-xs p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Birthday</h2>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.birthday}</p>
            </div>
            <div className="block max-w-xs p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Release Date</h2>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.releaseDate}</p>
            </div>
            <div className="block max-w-xs p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Gender</h2>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.gender}</p>
            </div>
            <div className="block max-w-xs p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Nation</h2>
                <p className="font-normal text-gray-700 dark:text-gray-400">{props.nation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Factions