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
        <div className = "w-4/5 flex-auto justify-center items-center mb-4 mx-auto">
            <div className="h-20"></div>
            {/* <button onClick = {() => console.log(props.wep)}>wep</button> */}

            <h1>{props.wep.data.name}</h1>
            <button onClick = {() => props.setWeaponPreviewState(false)}>Go Back</button>
            <div className="flex">
                <img className = "rounded-lg" src = {props.wep.icon}/>
                {reg()}
            </div>
            <div className=" border rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y table-auto divide-gray-200">
                    <thead className="text-xs dark:text-white uppercase bg-gray-50 dark:bg-gray-600">
                    <tr>
                        <td className="max-md:text-sm px-6 py-4 whitespace-nowrap text-left font-medium">Name</td>
                        <td className="max-md:text-sm px-6 py-4 whitespace-nowrap text-right font-medium">Value</td>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium dark:text-gray-400">Ascension Material</td>
                            <td className="max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium dark:text-gray-400">{props.wep.data.ascensionMaterial}</td>
                        </tr>
                        <tr>
                            <td className="max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium dark:text-gray-400">Base Attack</td>
                            <td className="max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium dark:text-gray-400">{props.wep.data.baseAttack}</td>
                        </tr>
                        <tr>
                            <td className="max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium dark:text-gray-400">Location</td>
                            <td className="max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium dark:text-gray-400">{props.wep.data.location}</td>
                        </tr>
                        <tr>
                            <td className="max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium dark:text-gray-400">Rarity</td>
                            <td className="max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium dark:text-gray-400">{props.wep.data.rarity}</td>
                        </tr>
                        <tr>
                            <td className="max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium dark:text-gray-400">Substat</td>
                            <td className="max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium dark:text-gray-400">{props.wep.data.subStat}</td>
                        </tr>
                        <tr>
                            <td className="max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium dark:text-gray-400">Rarity</td>
                            <td className="max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium dark:text-gray-400">{props.wep.data.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WeaponPreview