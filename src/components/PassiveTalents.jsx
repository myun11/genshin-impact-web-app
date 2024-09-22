import React from 'react'

const PassiveTalents = (props) => {
    const reorderedImages = [props.images["talent-passive-1"], props.images["talent-passive-2"], props.images["talent-passive-0"]]

    return (
        <div className="md:p-4">
            <h1 className = "uppercase font-bold p-4 text-4xl md:text-5xl text-black dark:text-white text-left lg:text-center">Passive Talents</h1>
            {/* Passive Talent cards */}
            <div className="">
                {props.passiveTalents.map((entry, idx) => {
                    const regex = new RegExp(`(${props.keywords.join('|')})`, 'gi');
                    const parts = entry.description.split(regex);
                    return(
                        <div className = "w-full p-2">
                            <div className= {props.cardColor + " p-5 inline-flex w-full items-center border border-gray-800 dark:border-gray-200 rounded-3xl lg:rounded-3xl shadow"}>
                                <img className="max-lg:hidden p-5 object-cover w-full md:h-auto md:w-auto" src={reorderedImages[idx]} alt=""/>
                                <div className="flex flex-col items-start lg:p-5 py-5 leading-normal">
                                    <div className="flex items-center">
                                        <img className="lg:hidden pr-5 object-contain w-28 md:h-auto md:w-auto" src={reorderedImages[idx]} alt=""/>
                                        <div className="">
                                            <p className="text-left text-lg italic tracking-tight text-gray-900 dark:text-white">{entry.unlock}</p>
                                            <h2 className="text-left mb-3 text-3xl font-bold max-md:tracking-tight text-gray-900 dark:text-white">{entry.name}</h2>
                                        </div>
                                    </div>
                                    <p className="text-left md:text-lg mb-3 font-normal text-gray-700 dark:text-gray-200">{
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