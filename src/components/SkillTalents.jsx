import React from 'react'

const SkillTalents = (props) => {
  const reorderedImages = [props.images["talent-na"], props.images["talent-skill"], props.images["talent-burst"]]

  return (
    <div className="">
      <h1 className = "p-4" >Skill Talents</h1>
      <div className="">
                {props.skillTalents.map((entry, idx) => {
                    const regex = new RegExp(`(${props.keywords.join('|')})`, 'gi');
                    const parts = entry.description.split(regex);
                    return(
                        <div className = "w-full p-2">
                            <div className="p-5 inline-flex w-full items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="p-5 object-cover w-full rounded-t-lg md:h-auto md:w-auto md:rounded-none md:rounded-s-lg" src={reorderedImages[idx]} alt=""/>
                                <div className="flex flex-col justify-between p-5 leading-normal">
                                    <h5 className="text-left mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{entry.unlock}: {entry.name}</h5>
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
                                    {entry.upgrades && entry.upgrades.map(obj => {
                                      return(
                                          <div>
                                              {/* <p>Name: {obj.name}</p>
                                              <p>Value: {obj.value}</p> */}
                                              <div>
                                                <div class="flex flex-col">
                                                  <div class="-m-1.5 overflow-x-auto">
                                                    <div class="p-1.5 w-1/2 inline-block align-middle">
                                                      <div class="border rounded-lg shadow overflow-hidden">
                                                        <table class="min-w-full divide-y divide-gray-200">
                                                          <tbody class="divide-y divide-gray-200">
                                                            <tr>
                                                              <td class="px-6 py-4 whitespace-nowrap text-start font-medium dark:text-gray-400">{obj.name}</td>
                                                              <td class="px-6 py-4 whitespace-nowrap text-end dark:text-gray-400">{obj.value}</td>
                                                              
                                                            </tr>

                                                          </tbody>
                                                        </table>
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
                        </div>


                    )
                })}
            </div>
    </div>
  )
}

export default SkillTalents