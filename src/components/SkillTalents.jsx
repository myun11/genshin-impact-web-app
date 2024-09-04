import React from 'react'

const SkillTalents = (props) => {
  const reorderedImages = [props.images["talent-na"], props.images["talent-skill"], props.images["talent-burst"]]

  return (
    <div className="md:p-4">
      <h1 className = "font-bold p-4 text-4xl md:text-5xl" >Skill Talents</h1>
      <div className="">
        {props.skillTalents.map((entry, idx) => {
            const regex = new RegExp(`(${props.keywords.join('|')})`, 'gi');
            const parts = entry.description.split(regex);
            return(
              <div className = "w-full py-2">
                <div className="p-5 md:flex w-full items-start bg-white border border-gray-200 rounded-3xl shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="text-start md:w-1/2 md:p-5">
                    
                    {/* Skill Header and Icon */}
                    <div className="inline-flex justify-between pr-5 pt-5 pb-5 leading-normal">                      
                      <img className="pr-5 pt-5 pb-5 rounded-t-lg md:rounded-none md:rounded-s-lg" src={reorderedImages[idx]} alt=""/>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-left text-lg italic tracking-tight text-gray-900 dark:text-white">{entry.unlock}</p>
                        <h2 className="text-left mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{entry.name}</h2>
                      </div>
                    </div>
                  
                    {/* Skill Description */}
                    <div>
                      <p className="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">{
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
                  <div className= "md:w-1/2">
                    <div className="md:flex md:flex-col">
                      <div className="md:m-1.5 overflow-x-auto">
                        <div className="md:p-1.5 md:w-4/5 md:inline-block ">
                          <div className="border rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y table-auto divide-gray-200">
                              <thead className="text-xs dark:text-white uppercase bg-gray-50 dark:bg-gray-600">
                                <tr>
                                  <td className="max-md:text-sm px-6 py-4 whitespace-nowrap text-left font-medium">Attack Sequence</td>
                                  <td className="max-md:text-sm px-6 py-4 whitespace-nowrap text-right font-medium">Value</td>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                              {entry.upgrades && entry.upgrades.map(obj => {
                                return(
                                <tr>
                                  <td className="max-md:text-sm px-3 py-4 whitespace-nowrap text-left font-medium dark:text-gray-400">{obj.name}</td>
                                  <td className="max-md:text-sm px-3 mr-5 py-4 whitespace-nowrap text-right font-medium dark:text-gray-400">{obj.value}</td>
                                </tr>)
                              })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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