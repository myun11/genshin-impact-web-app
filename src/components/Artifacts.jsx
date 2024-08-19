import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loader'

const Artifacts = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [images, setImages] = useState([])

    // For pagination
    const [page, setPage] = useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [input, setInput] = useState("")
    const [faultyArtifacts, setFaultyArtifacts] = useState([])

    const fetchData = async () => {
        try{
            await axios.get('https://genshin.jmp.blue/artifacts/')
            .then(res => {
                res.data.map(async id => {
                    try {
                        await axios.get('https://genshin.jmp.blue/artifacts/' + id)
                        .then(res2 => {
                            setData(prev => [...prev, res2.data])
                            // return(res2.data)
                        })
                        .then(async (resdata) => {
                            try {
                                const items = await axios.get('https://genshin.jmp.blue/artifacts/' + id + '/list')
                            
                                let endpoints = items.data.map(artifact_name => {
                                    return({
                                        "artifact_name": artifact_name,
                                        "url": 'https://genshin.jmp.blue/artifacts/' + id + '/' + artifact_name
                                    })
                                })
                                // let urls = res3.data.map(artifact_name => 'https://genshin.jmp.blue/artifacts/' + archetype + '/' + artifact_name)
                                // setData(prev => [...prev, {
                                //     "data" : resdata,
                                //     "images": res3.data
                                // }])
                                setImages(prev => [...prev, {
                                    "id": id,
                                    "endpoints": endpoints
                                }])
                            } catch (error) {
                                console.log(error)
                            }
                        })
                    } catch (error) {
                        console.log(error)
                    }
                })
            })
            .then(res => {
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Input Artifact id, return artifact images
    function match(id) {
        let items = images.filter(entry => entry.id == id)
        if (items.length > 0) {
            return items[0].endpoints
        } else {
            return []
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setPage(0)
        if (input.length > 0) {
            let temp = data.filter(entry => entry.name.toLowerCase().includes(input.toLowerCase())
            )
            setFilteredData(temp)
        } else {
            setFilteredData(data)
        }
    }, [input, data])

    return (
        <div className="w-5/6 mx-auto">
            <h1>Artifacts</h1>
            <div className = "p-4">
                <div className = "bg-slate-500 h-1 w-full"></div>
                filter stuff maybe here?
                <div className = "bg-slate-500 h-1 w-full"></div>
            </div>
            { loading ? 
                <div>
                    <Loader loading = {loading}/>
                </div> : 
                <div>
                    {/* <button onClick = {() => console.log(data)}>data</button>
                    <button onClick = {() => console.log(images)}>images</button>
                    table stuff goes here */}
                    <button onClick = {() => console.log(match("berserker"))}> match</button>

                    <div class="flex flex-col">
                        <div class="-m-1.5 overflow-x-auto">
                            <div class="p-1.5 min-w-full inline-block align-middle">
                            <div class="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                                <div class="py-3 px-4">
                                <div class="relative max-w-xs">
                                    <label class="sr-only">Search</label>
                                    <input onChange={(e) => {
                                        setInput(e.target.value)
                                    }} type="text" name="hs-table-with-pagination-search" id="hs-table-with-pagination-search" class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-400 dark:focus:ring-neutral-600" placeholder="Search for Artifact Class"/>
                                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                    <svg class="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </svg>
                                    </div>
                                </div>
                                </div>
                                <div class="overflow-hidden">
                                <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead class="bg-gray-50 dark:bg-neutral-700">
                                    <tr className="divide-x divide-gray-200 dark:divide-slate-500">
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Artifact Class</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Artifacts</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">2-Piece Bonus</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">4-Piece Bonus</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Max Rarity</th>
                                        {/* <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Items</th> */}
                                    </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                                    { data.length > 0 ?
                                        filteredData.map((entry, idx) => {
                                            if (idx >= page * entriesPerPage && idx < (page + 1) * entriesPerPage) {
                                                return(
                                                    <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-400 ease-in-out">
                                                        <td class="px-6 py-4 whitespace-nowrap text-start font-medium text-gray-800 dark:text-neutral-200">{entry["name"]}</td>
                                                        <td class="inline-flex px-6 py-4 whitespace-nowrap text-start font-medium text-gray-800 dark:text-neutral-200">
                                                            {match(entry.id).map(item => 
                                                            <td class="w-20">
                                                                <img className="w-40" src = {item.url}/>
                                                            </td>)}
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["2-piece_bonus"]}</td>
                                                        <td class="text-wrap px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["4-piece_bonus"]}</td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["max_rarity"]}</td>
                                                    </tr>
                                                    )        
                                            }
                                        }) :
                                        <Loader/>
                                        
                                    }
                                    </tbody>
                                </table>
                                </div>
                                <div class="py-1 px-4">
                                <nav class="flex items-center space-x-1" aria-label="Pagination">
                                    <button onClick = {() => {
                                        if (page != 0) {
                                            setPage(prev => prev - 1)
                                        }
                                    }} type="button" class="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                    <span class="sr-only">Previous</span>
                                    </button>
                                    {
                                        
                                        filteredData.map((entry, idx) => {
                                            if (idx < filteredData.length / entriesPerPage) {
                                                return(
                                                    <button onClick = {() => {
                                                        setPage(idx)
                                                    }}type="button" class={page == idx ? 
                                                        "bg-black min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                                        :
                                                        "bg-gray-600 min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"}>{idx + 1}</button>
                                                )
                                            }
                                        })
                                    }
                                    <button onClick = {() => {
                                        if (page != Math.floor(filteredData.length / entriesPerPage)) {
                                            setPage(prev => prev + 1)
                                        }
                                    }} type="button" class="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Next">
                                    <span class="sr-only">Next</span>
                                    <span aria-hidden="true">»</span>
                                    </button>
                                </nav>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
            }
            
        </div>
    )
}

export default Artifacts