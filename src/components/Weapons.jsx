import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weapons = () => {

    const [weapons, setWeapons] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try{
            await axios.get('https://genshin.jmp.blue/weapons')
            .then(res => {
                res.data.map(async weapon => {
                    if (weapon != "sword-of-narzissenkreuz") { // Until API is updated.
                        try {
                            await axios.get('https://genshin.jmp.blue/weapons/' + weapon)
                            .then(res2 => {

                                // This method updates state better than the method below.
                                setWeapons(wep => [...wep, {
                                    'id' : weapon,
                                    'data' : res2.data,
                                    'icon' : 'https://genshin.jmp.blue/weapons/' + weapon + '/icon'
                                }])
                            })
                        } catch (error) {
                            console.log("Error getting weapon data: ", error)
                        }
                    }
                })
                // const array = []
                // res.data.map(async weapon => {
                //     if (weapon != "sword-of-narzissenkreuz") { // Until API is updated.
                //         try {
                //             await axios.get('https://genshin.jmp.blue/weapons/' + weapon)
                //             .then(res2 => {
                //                 // console.log("testing :",  res2.data)
                //                 array.push({
                //                     'id' : weapon,
                //                     'data' : res2.data,
                //                     'icon' : 'https://genshin.jmp.blue/weapons/' + weapon + '/icon'
                //                 })
                //             })
                //         } catch (error) {
                //             console.log("Error getting weapon data: ", error)
                //         }
                //     }
                // })
                // setWeapons(array)
            })
            .then(() => setLoading(false))
          } catch (error) {
            console.log("Error getting weapons names: ", error)
          }
    }
    useEffect(() => {
        fetchData()
        
    }, [])
    return(
        <div>
        {loading ? 
            <div>
                Loading...
            </div> :
            <div>
                <div className = "grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 ">
                    {weapons.map(entry => {
                        return(
                            <div className = "border-4 w-full h-full box rounded-lg hover:bg-purple-500 hover:border-purple-500 transition duration-300 ease-in-out">
                                <button className = "bg-gradient-to-b from-purple-500 to-white" >
                                    <img className="w-64 h-64 rounded-lg " src = {entry.icon} onClick = {() => {
                                
                                }}/></button>
                                <h2 className = "capitalize dark:text-white">{entry.data.name}</h2>
                            </div>
                        )
                        
                    })}                
                </div>
            </div>
        }
    </div>    
    )
    
}

export default Weapons