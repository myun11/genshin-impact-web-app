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
                res.data.map(async archetype => {
                    try {
                        await axios.get('https://genshin.jmp.blue/artifacts/' + archetype)
                        .then(res2 => {
                            setData(prev => [...prev, res2.data])
                        })
                        .then(async () => {
                            try {
                                await axios.get('https://genshin.jmp.blue/artifacts/' + archetype + '/list')
                                .then(res3 => {
                                    // console.log(res3)
                                    let endpoints = res3.data.map(artifact_name => {
                                        return({
                                            "artifact_name": artifact_name,
                                            "url": 'https://genshin.jmp.blue/artifacts/' + archetype + '/' + artifact_name
                                        })
                                    })
                                    setImages(prev => [...prev, {
                                        "archetype": archetype,
                                        "endpoints": endpoints
                                    }])
                                })    
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
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log("input is: ", input)
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
                    <button onClick = {() => console.log(data)}>data</button>
                    <button onClick = {() => console.log(images)}>images</button>
                    table stuff goes here

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
                                        <th scope="col" class="py-3 px-4 pe-0">
                                        <div class="flex items-center h-5">
                                            <input id="hs-table-pagination-checkbox-all" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                                            <label for="hs-table-pagination-checkbox-all" class="sr-only">Checkbox</label>
                                        </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Artifact Class</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">2-Piece Bonus</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">4-Piece Bonus</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Max Rarity</th>
                                        <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                                    { data.length > 0 ?
                                        filteredData.map((entry, idx) => {
                                            if (idx >= page * entriesPerPage && idx < (page + 1) * entriesPerPage) {
                                                return(
                                                    <tr>
                                                        <td class="py-3 ps-4">
                                                        <div class="flex items-center h-5">
                                                            <input id="hs-table-pagination-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
                                                            <label for="hs-table-pagination-checkbox-1" class="sr-only">Checkbox</label>
                                                        </div>
                                                        </td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-start font-medium text-gray-800 dark:text-neutral-200">{entry["name"]}</td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["2-piece_bonus"]}</td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["4-piece_bonus"]}</td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["rarity"]}</td>
                                                        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                        <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Delete</button>
                                                        </td>
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