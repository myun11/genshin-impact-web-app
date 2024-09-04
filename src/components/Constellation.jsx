import React from 'react'

const Constellation = (props) => {

  return (
    <div className="md:p-4">
        <h1 className="font-bold p-4 text-4xl md:text-5xl">Constellation: {props.constellationName}</h1>
        <div className="items-center justify-center lg:grid lg:grid-cols-2 lg:gap-4">

            {/* Image */}
            <div className="justify-items-center relative">
                <div className="grow z-50 left-[4.167%] top-[4.167%] p-4 absolute rounded-3xl w-11/12 min-h-[91.67%] border-white border"> </div>
                <img className="justify-items-center border-solid border-4 border-white rounded-3xl" src={props.images["constellation"]}/>
                {/* <img src = {props.images["constellation-shape"]}/> */}
            </div>

            {/* Level up cards */}
            <div className="">
                {props.constellationLevel.map((entry, idx) => {
                    const regex = new RegExp(`(${props.keywords.join('|')})`, 'gi');
                    const parts = entry.description.split(regex);
                    let num = (idx + 1).toString()
                    return(
                        <div className = "w-full p-2">
                            <div className="p-5 flex w-full items-center bg-white border border-gray-200 rounded-3xl lg:rounded-full shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div>
                                    <img className="max-lg:hidden object-cover w-full md:h-auto md:w-auto" src={props.images["constellation-" + num]} alt=""/>
                                </div>
                                <div className="flex flex-col items-start lg:p-5 py-5 leading-normal">
                                    <div className="flex items-center">
                                        <img className="lg:hidden pr-5 object-contain w-28 md:h-auto md:w-auto" src={props.images["constellation-" + num]} alt=""/>
                                        <div className="">
                                            <p className="text-left text-lg italic tracking-tight text-gray-900 dark:text-white">Level {entry.level}</p>
                                            <h2 className="text-left mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{entry.name}</h2>
                                        </div>
                                    </div>
                                    <p className="text-left md:text-lg mb-3 font-normal text-gray-700 dark:text-gray-400">{
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
    </div>
  )
}

export default Constellation