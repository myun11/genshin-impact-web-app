import React from 'react'
import Keywords from './Keywords';
const WeaponPreview = (props) => {

    const keywords = Keywords

    function reg() {
        const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
        const parts = props.wep.data.passiveDesc.split(regex);
        return(
            <div className = "w-full p-2">
                <div className="p-5 inline-flex w-full items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <h2>Passive Name: {props.wep.data.passiveName}</h2>
                    <div className="flex flex-col justify-between p-5 leading-normal">
                        
                        <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{
                            parts.map((part, index) =>
                                keywords.some(keyword => new RegExp(keyword).test(part)) ? (
                                    <span key={index} className={"text-white"}>
                                    {part}
                                    </span>
                                ) : (
                                    <span key={index}>{part}</span>
                                )
                            )
                        }</p>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className = "flex-auto justify-center items-center mb-4 mx-auto">
            <button onClick = {() => console.log(props.wep)}>wep</button>

            <h1>{props.wep.data.name}</h1>
            <img className = "rounded-lg" src = {props.wep.icon}/>
            <button onClick = {() => props.setWeaponPreviewState(false)}>Go Back</button>
            <p>Ascension Material: {props.wep.data.ascensionMaterial}</p>
            <p>Base Attack: {props.wep.data.baseAttack}</p>
            <p>Location: {props.wep.data.location}</p>
                {
                     reg()   
                    }
            <p>Rarity: {props.wep.data.rarity}</p>
            <p>Substat: {props.wep.data.subStat}</p>
            <p>Type: {props.wep.data.type}</p>
        </div>
    )
}

export default WeaponPreview