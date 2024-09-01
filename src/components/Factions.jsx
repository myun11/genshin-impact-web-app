import React, { useEffect, useState } from 'react'
import Bow_Icon from '../images/Icon_Bow.webp'
import Catalyst_Icon from '../images/Icon_Catalyst.webp'
import Claymore_Icon from '../images/Icon_Claymore.webp'
import Polearm_Icon from '../images/Icon_Polearm.webp'
import Sword_Icon from '../images/Icon_Sword.webp'
import Star from '../images/Star.png'

const Factions = (props) => {
  const [weaponIcon, setWeaponIcon] = useState("")
  useEffect(() => {
    if (props.weapon == "Sword") {
      setWeaponIcon(Sword_Icon)
    }
    if (props.weapon == "Claymore") {
      setWeaponIcon(Claymore_Icon)
    }
    if (props.weapon == "Bow") {
      setWeaponIcon(Bow_Icon)
    }
    if (props.weapon == "Catalyst") {
      setWeaponIcon(Catalyst_Icon)
    }
    if (props.weapon == "Polearm") {
      setWeaponIcon(Polearm_Icon)
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
      <h1 className = "font-bold p-4">Factions</h1>
      {/* PC */}
      <div className = "max-lg:hidden flex justify-center items-center">
        <img className="rounded-lg" src = {'https://genshin.jmp.blue/characters/' + props.id + '/icon-big'}/>
        <div className="grid">
          <div className={" justify-center h-32 items-center flex rounded-3xl bg-gradient-to-br " + props.visionIconLow + " " + props.visionIconHigh }>
            {/* Vision and Weapon type */}
            <div className = "m-2 inline-flex">
              <img className="" src = {'https://genshin.jmp.blue/elements/' + props.vision.toLowerCase() + '/icon'} />
              <img className="" src = {weaponIcon}/>         
            </div>
            {/* Divider  */}
            <div className = "h-[60px]  bg-slate-500 w-[2px]">
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

      {/* Mobile */}
      <div className = "lg:hidden text-left p-4 justify-center items-center mx-auto bg-slate-800 rounded-lg">
        <table class="border-separate border border-slate-500 w-full border-spacing-2">
          <tbody>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Weapon: </h2></td>
              <td class="border border-slate-700 ..."><img src={weaponIcon}/></td>
            </tr>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Vision: </h2></td>
              <td class="border border-slate-700 ..."><img className="" src = {'https://genshin.jmp.blue/elements/' + props.vision.toLowerCase() + '/icon'} /></td>
            </tr>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Rarity: </h2></td>
              <td class="border border-slate-700 ..."><div className="inline-flex">{convertRarity()}</div></td>
            </tr>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Affiliation: </h2></td>
              <td class="border border-slate-700 ..."><p className="font-normal text-gray-700 dark:text-gray-400">{props.affiliation}</p></td>
            </tr>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Birthday: </h2></td>
              <td class="border border-slate-700 ..."><p className="font-normal text-gray-700 dark:text-gray-400">{props.birthday}</p></td>
            </tr>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Release Date: </h2></td>
              <td class="border border-slate-700 ..."><p className="font-normal text-gray-700 dark:text-gray-400">{props.releaseDate}</p></td>
            </tr>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Gender: </h2></td>
              <td class="border border-slate-700 ..."><p className="font-normal text-gray-700 dark:text-gray-400">{props.gender}</p></td>
            </tr>
            <tr>
              <td class="border border-slate-700 ..."><h2 className="text-2xl">Nation: </h2></td>
              <td class="border border-slate-700 ..."><p className="font-normal text-gray-700 dark:text-gray-400">{props.nation}</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Factions