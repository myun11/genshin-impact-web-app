import React, { useState } from 'react'
import RadarChart from './RadarChart'

const SkillTalents = (props) => {
  const reorderedImages = [props.images["talent-na"], props.images["talent-skill"], props.images["talent-burst"]]
  const [chart, showChart] = useState(true)

  return (
    <div className="md:p-4">
      <h1 className = "uppercase font-bold p-4 text-4xl md:text-5xl text-black dark:text-white text-left lg:text-center" >Skill Talents</h1>
      <div className="">
        {props.skillTalents.map((entry, idx) => {
            const regex = new RegExp(`(${props.keywords.join('|')})`, 'gi');
            const parts = entry.description.split(regex);
            return(
              <div className = "w-full py-2">
                <div className= {props.cardColor + " p-5 lg:flex w-full items-center border border-gray-800 dark:border-gray-200 rounded-3xl shadow"}>
                  <div className="text-start lg:w-1/2 lg:p-5 ">
                    
                    {/* Skill Header and Icon */}
                    <div className="inline-flex justify-between p-5 leading-normal">                      
                      <img className="pr-5 rounded-t-lg lg:rounded-none lg:rounded-s-lg w-28 md:h-auto md:w-auto" src={reorderedImages[idx]} alt=""/>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-left text-lg italic tracking-tight text-gray-900 dark:text-white">{entry.unlock}</p>
                        <h2 className="text-left mb-3 text-3xl font-bold max-md:tracking-tight text-gray-900 dark:text-white">{entry.name}</h2>
                      </div>
                    </div>
                  
                    {/* Skill Description */}
                    <div className="max-lg:py-5">
                      <p className="text-left md:text-lg mb-3 font-normal text-gray-700 dark:text-gray-200">{
                        parts.map((part, index) =>
                          props.keywords.some(keyword => new RegExp(keyword).test(part)) ? (
                            <span key={index} className={props.keywordsColor}>
                              {part}
                            </span>
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                  {/* Table */}

                  <div className= "lg:w-1/2">
                    <div className="lg:flex lg:flex-col">
                      {idx == 0 && chart ?
                      <div className="">
                        <RadarChart
                          chart = {chart}
                          showChart = {showChart}
                          charPreviewData = {props.charPreviewData}
                          rosterData = {props.rosterData}
                        />
                      </div>
                      :
                      <div className="lg:m-1.5 overflow-x-auto">
                        <div className="lg:p-1.5 lg:w-4/5 lg:inline-block ">
                          <div className="border border-slate-500 dark:border-white shadow max-lg:overflow-scroll lg:rounded-b-3xl">
                            <table className="text-black dark:text-white min-w-full divide-y table-auto divide-black dark:divide-gray-200">
                              <thead className="text-xs uppercase bg-gray-300 dark:bg-gray-600">
                                <tr>
                                  <td className="text-sm md:text-lg px-6 py-4 whitespace-nowrap text-left font-medium">Attack Sequence</td>
                                  <td className="text-sm md:text-lg px-6 py-4 whitespace-nowrap text-right font-medium">Value</td>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-black dark:divide-gray-200">
                              {entry.upgrades && entry.upgrades.map(obj => {
                                return(
                                <tr>
                                  <td className="text-sm md:text-lg px-3 py-4 whitespace-nowrap text-left font-medium">{obj.name}</td>
                                  <td className="text-sm md:text-lg px-3 mr-5 py-4 whitespace-nowrap text-right font-medium">{obj.value}</td>
                                </tr>)
                              })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default SkillTalents