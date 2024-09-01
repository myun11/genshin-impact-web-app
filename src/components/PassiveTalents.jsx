import React from 'react'

const PassiveTalents = (props) => {
    const reorderedImages = [props.images["talent-passive-1"], props.images["talent-passive-2"], props.images["talent-passive-0"]]

    return (
        <div>
            <h1 className = "font-bold p-4">Passive Talents</h1>
            {/* Passive Talent cards */}
            <div className="">
                {props.passiveTalents.map((entry, idx) => {
                    const regex = new RegExp(`(${props.keywords.join('|')})`, 'gi');
                    const parts = entry.description.split(regex);
                    return(
                        <div className = "w-full p-2">
                            <div className="p-5 inline-flex w-full items-center bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="p-5 object-cover w-full rounded-t-lg md:h-auto md:w-auto md:rounded-none md:rounded-s-lg" src={reorderedImages[idx]} alt=""/>
                                <div className="flex flex-col justify-between p-5 leading-normal">
                                    <h5 className="text-left mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Level {entry.unlock}: {entry.name}</h5>
                                    <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{
                                    parts.map((part, index) =>
                                        props.keywords.some(keyword => new RegExp(keyword).test(part)) ? (
                                          <span key={index} className={props.keywordsColor}>
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
                })}
            </div>
            
        </div>
    )
}

export default PassiveTalents