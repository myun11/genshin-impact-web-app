import React from 'react'

const WeaponPreview = (props) => {
  return (
    <div className = "flex-auto justify-center items-center mx-auto">

        <h1>{props.wep.data.name}</h1>
        <img className = "rounded-lg" src = {props.wep.icon}/>
        <button onClick = {() => props.setWeaponPreviewState(false)}>Go Back</button>
        <p>Ascension Material: {props.wep.data.ascensionMaterial}</p>
        <p>Base Attack: {props.wep.data.baseAttack}</p>
        <p>Location: {props.wep.data.location}</p>
        <p>Passive Name: {props.wep.data.passiveName}</p>
        <p>Passive Description: {props.wep.data.passiveDesc}</p>
        <p>Rarity: {props.wep.data.rarity}</p>
        <p>Substat: {props.wep.data.subStat}</p>
        <p>Type: {props.wep.data.type}</p>
    </div>
  )
}

export default WeaponPreview