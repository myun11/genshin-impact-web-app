import React from 'react'

const Constellation = (props) => {

  return (
    <div>
        <h1>Constellation: {props.constellationName}</h1>
        <div className="items-center justify-center grid grid-cols-2 gap-4">

            {/* Image */}
            <div className="justify-items-center">
                <img className="justify-items-center" src={props.images["constellation"]}/>
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
                            <div className="p-5 inline-flex w-full items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="p-5 object-cover w-full rounded-t-lg md:h-auto md:w-auto md:rounded-none md:rounded-s-lg" src={props.images["constellation-" + num]} alt=""/>
                                <div className="flex flex-col justify-between p-5 leading-normal">
                                    <h5 className="text-left mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Level {entry.level}: {entry.name}</h5>
                                    <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{
                                        parts.map((part, index) =>
                                            props.keywords.some(keyword => new RegExp(keyword, 'i').test(part)) ? (
                                                <span key={index} className="text-cyan-300">
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