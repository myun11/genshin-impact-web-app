import React from 'react'
import Keywords from './Keywords';
const WeaponPreview = (props) => {
    const keywords = Keywords
    function reg() {
        const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
        const parts = props.wep.data.passiveDesc.split(regex);
        return(
            <div className = "w-full max-md:p-2">
                <div className="p-5 lg:inline-flex w-full items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="">
                        {/* <p className="text-left text-lg italic tracking-tight text-gray-900 dark:text-white">Passive Name</p> */}
                        <h2 className="text-black dark:text-white text-xl">{props.wep.data.passiveName}</h2>
                    </div>
                    <div className="flex flex-col justify-between p-5 leading-normal">
                        
                        <p className="text-left mb-3 text-xl font-normal text-gray-700 dark:text-gray-200">{
                            parts.map((part, index) =>
                                keywords.some(keyword => new RegExp(keyword).test(part)) ? (
                                    <span key={index} className={"text-gray-400 dark:text-gray-400"}>
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
        <div className = "lg:w-4/5 flex-auto justify-center items-center mb-4 mx-auto">
            <div className="h-20"></div>
            {/* <button onClick = {() => console.log(props.wep)}>wep</button> */}

            <h1 className="text-black dark:text-white uppercase font-bold">{props.wep.data.name}</h1>
            <button className={"group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white"} onClick = {() => {
                props.setWeaponPreviewState(false)
                window.scrollTo(0, 0)
            }}>
                <div class="mr-0 w-0 -translate-x-[100%] opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <span className="text-2xl text-black dark:text-white">
                    Go Back
                </span>
            </button>
            <div className="lg:flex h-full justify-center items-center mx-auto py-4">
                <img className = "rounded-lg flex items-center justify-center mx-auto" src = {props.wep.icon}/>
                {reg()}
            </div>
            <div className=" border rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y table-auto divide-gray-200">
                    <thead className="text-xs dark:text-white uppercase bg-gray-50 dark:bg-gray-600">
                    <tr>
                        <td className="text-xl max-md:text-sm px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-300 text-left font-medium">Name</td>
                        <td className="text-xl max-md:text-sm px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-300 text-right font-medium">Value</td>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="text-xl max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium text-gray-800 dark:text-gray-200">Ascension Material</td>
                            <td className="text-xl max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium text-gray-800 dark:text-gray-200">{props.wep.data.ascensionMaterial}</td>
                        </tr>
                        <tr>
                            <td className="text-xl max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium text-gray-800 dark:text-gray-200">Base Attack</td>
                            <td className="text-xl max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium text-gray-800 dark:text-gray-200">{props.wep.data.baseAttack}</td>
                        </tr>
                        <tr>
                            <td className="text-xl max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium text-gray-800 dark:text-gray-200">Location</td>
                            <td className="text-xl max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium text-gray-800 dark:text-gray-200">{props.wep.data.location}</td>
                        </tr>
                        <tr>
                            <td className="text-xl max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium text-gray-800 dark:text-gray-200">Rarity</td>
                            <td className="text-xl max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium text-gray-800 dark:text-gray-200">{props.wep.data.rarity}</td>
                        </tr>
                        <tr>
                            <td className="text-xl max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium text-gray-800 dark:text-gray-200">Substat</td>
                            <td className="text-xl max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium text-gray-800 dark:text-gray-200">{props.wep.data.subStat}</td>
                        </tr>
                        <tr>
                            <td className="text-xl max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium text-gray-800 dark:text-gray-200">Rarity</td>
                            <td className="text-xl max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium text-gray-800 dark:text-gray-200">{props.wep.data.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WeaponPreview