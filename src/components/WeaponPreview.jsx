import React from 'react'

const WeaponPreview = (props) => {

    const keywords = [
        '\\d*\\.?\\d+s', // Any integer or float number followed by "s"
        'CRIT Rate',
        'CRIT DMG',
        '\\d*\\.?\\d+%', // Any integer or float number followed by "%"
        'ATK SPD',
        'Movement SPD',
        'Charged Attack',
        'Elemental Skill DMG',
        'Elemental Skill',
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
        'Elemental Mastery',
        'Charged',
        'Normal Attacks',
        'attacks',
        'CD',

    ];

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
        <div className = "flex-auto justify-center items-center mx-auto">

            <h1>{props.wep.data.name}</h1>
            <img className = "rounded-lg" src = {props.wep.icon}/>
            <button onClick = {() => props.setWeaponPreviewState(false)}>Go Back</button>
            <p>Ascension Material: {props.wep.data.ascensionMaterial}</p>
            <p>Base Attack: {props.wep.data.baseAttack}</p>
            <p>Location: {props.wep.data.location}</p>
            <p>Passive Name: {props.wep.data.passiveName}</p>
            <p>Passive Description: {props.wep.data.passiveDesc}</p>

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