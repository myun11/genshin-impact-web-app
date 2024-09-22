import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'

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
        <div className="p-2 md:p-4 min-h-screen">
            <div className="h-20"></div>
            <h1 className="p-4 text-black dark:text-white">Artifacts</h1>

            { loading ? 
                <div>
                    <Loader loading = {loading}/>
                </div> : 
                <div className="">
                    {/* <button onClick = {() => console.log(data)}>data</button>
                    <button onClick = {() => console.log(images)}>images</button>
                    table stuff goes here */}
                    <div className = "p-4">
                        <div className = "bg-slate-500 h-1 w-full"></div>
                        {/* filter stuff maybe here? */}
                        <div className = "max-lg:hidden bg-slate-500 h-1 w-full"></div>
                    </div>
                    <div className="flex flex-col w-full mx-auto">
                        <div className="lg:-m-1.5 ">
                            <div className="lg:p-1.5 max-w-full inline-block align-middle">
                                <div className="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                                    <div className="py-3 px-4">
                                        <div className="relative max-w-xs">
                                            <label className="sr-only">Search</label>
                                            <input onChange={(e) => {
                                                setInput(e.target.value)
                                            }} type="text" name="hs-table-with-pagination-search" id="hs-table-with-pagination-search" className="py-2 px-3 ps-9 block w-full bg-gray-200 border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-400 dark:focus:ring-neutral-600" placeholder="Search for Artifact Class"/>
                                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                                <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <path d="m21 21-4.3-4.3"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        {/* Table */}
                                        <table className="max-lg:hidden min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                            <thead className="bg-gray-50 dark:bg-neutral-700">
                                                <tr className="divide-x divide-gray-200 dark:divide-slate-500">
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Artifact Class</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Artifacts</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">2-Piece Bonus</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">4-Piece Bonus</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Max Rarity</th>
                                                    {/* <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-300">Items</th> */}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                            { data.length > 0 ?
                                                filteredData.map((entry, idx) => {
                                                    if (idx >= page * entriesPerPage && idx < (page + 1) * entriesPerPage) {
                                                        return(
                                                            <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-400 ease-in-out">
                                                                <td className="px-6 py-4 whitespace-nowrap text-start font-medium text-gray-800 dark:text-neutral-200">{entry["name"]}</td>
                                                                <td className="inline-flex px-6 py-4 whitespace-nowrap text-start font-medium text-gray-800 dark:text-neutral-200">
                                                                    {match(entry.id).map(item => 
                                                                    <td className="w-20">
                                                                        <img className="w-40" src = {item.url}/>
                                                                    </td>)}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["2-piece_bonus"]}</td>
                                                                <td className="text-wrap px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["4-piece_bonus"]}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-start text-gray-800 dark:text-neutral-200">{entry["max_rarity"]}</td>
                                                            </tr>
                                                        )        
                                                    }
                                                }) :
                                                    <Loader/>
                                                }
                                            </tbody>
                                        </table>

                                        {/* Card Form */}
                                        <div className="lg:hidden w-full p-4 space-y-4 flex-col m-auto items-center justify-center">
                                            { data.length > 0 ?
                                                filteredData.map((entry, idx) => {
                                                    if (idx >= page * entriesPerPage && idx < (page + 1) * entriesPerPage) {
                                                        return(
                                                            <div className = "block py-2 bg-slate-300 dark:bg-slate-800 w-full border border-gray-800 dark:border-gray-200 rounded-xl shadow">
                                                                <div className="p-2 text-start font-medium text-gray-800 dark:text-neutral-200">
                                                                    <p className="uppercase font-bold">Artifact Class:</p>
                                                                    {entry["name"]}
                                                                </div>
                                                                <div className="p-2 inline-flex text-start font-medium text-gray-800 dark:text-neutral-200">
                                                                    {match(entry.id).map(item => 
                                                                    <div>
                                                                        <img className="w-40" src = {item.url}/>
                                                                    </div>)}
                                                                </div>
                                                                <div className="p-2 text-start text-gray-800 dark:text-neutral-200">
                                                                    <p className="uppercase font-bold">2-Piece Bonus:</p>
                                                                    {entry["2-piece_bonus"]}
                                                                </div>
                                                                <div className="p-2 text-start text-gray-800 dark:text-neutral-200">
                                                                    <p className="uppercase font-bold">4-Piece Bonus:</p>
                                                                    {entry["4-piece_bonus"]}
                                                                </div>
                                                                <div className="p-2  text-start text-gray-800 dark:text-neutral-200">
                                                                    <p className="uppercase font-bold">Rarity:</p>
                                                                    {entry["max_rarity"]}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }) :
                                                <Loader/>
                                            }
                                        </div>

                                    </div>
                                    <div className="py-1 px-4">
                                        <nav className="flex items-center space-x-1 max-sm:overflow-x-scroll" aria-label="Pagination">
                                            <button onClick = {() => {
                                                if (page != 0) {
                                                    setPage(prev => prev - 1)
                                                }
                                            }} type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-gray-400 dark:bg-gray-900 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                            <span className="sr-only">Previous</span>
                                            </button>
                                            {
                                                filteredData.map((entry, idx) => {
                                                    if (idx < filteredData.length / entriesPerPage) {
                                                        return(
                                                            <button onClick = {() => {
                                                                setPage(idx)
                                                            }}type="button" className={page == idx ? 
                                                                "bg-gray-400 dark:bg-black min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                                                                :
                                                                "bg-gray-200 dark:bg-gray-600 min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"}>{idx + 1}</button>
                                                        )
                                                    }
                                                })
                                            }
                                            <button onClick = {() => {
                                                if (page != Math.floor(filteredData.length / entriesPerPage)) {
                                                    setPage(prev => prev + 1)
                                                }
                                            }} type="button" className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full bg-gray-400 dark:bg-gray-900 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-label="Next">
                                            <span className="sr-only">Next</span>
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