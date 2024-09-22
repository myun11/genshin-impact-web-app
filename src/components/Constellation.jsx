import React from 'react'

const Constellation = (props) => {

  return (
    <div className="md:p-4">
        <h1 className="font-bold uppercase p-4 text-4xl md:text-5xl text-black dark:text-white text-left lg:text-center">Constellation: <p className = "italic">{props.constellationName}</p></h1>
        <div className="items-center justify-center lg:grid lg:grid-cols-5 lg:grid-flow-row">

            {/* Image */}
            <div className="relative items-center justify-center m-auto col-span-2 row-span-2">
                <div className="absolute z-20 left-[4.167%] top-[4.167%] rounded-3xl min-w-[91.67%] min-h-[91.67%] border-white border"> </div>
                <img className="items-center justify-center border-solid border-4 border-white rounded-3xl w-full" src={props.images["constellation"]}/>
                {/* <img src = {props.images["constellation-shape"]}/> */}
            </div>

            {/* Level up cards */}

            {props.constellationLevel.map((entry, idx) => {
                const regex = new RegExp(`(${props.keywords.join('|')})`, 'gi');
                const parts = entry.description.split(regex);
                let num = (idx + 1).toString()
                return(
                    <div className = {idx < 2 ? "w-full p-2 lg:col-span-3" : "w-full p-2 lg:col-span-5"}>
                        <div className= {props.cardColor + " p-5 flex w-full items-center border border-gray-800 dark:border-gray-200 rounded-3xl lg:rounded-3xl shadow"}>
                            {/* PC upgrade icons */}
                            <img className="max-lg:hidden object-cover w-full md:h-auto md:w-auto" src={props.images["constellation-" + num]} alt=""/>
                            <div className="flex flex-col items-start lg:p-5 py-5 leading-normal">
                                <div className="flex items-center">
                                    {/* Mobile upgrade icons */}
                                    <img className="lg:hidden pr-5 object-contain w-28 md:h-auto md:w-auto" src={props.images["constellation-" + num]} alt=""/>
                                    <div className="">
                                        <p className="text-left text-lg italic tracking-tight text-gray-900 dark:text-white">Level {entry.level}</p>
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

export default Constellation