import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Consumables = () => {

  const [data, setData] = useState([])

  async function fetchData(type) {
    try {
      await axios.get('https://genshin.jmp.blue/consumables/' + type)
      .then(res => {
        return res.data
      })  
    } catch (error) {
      console.log("Error getting consumables data: ", error)
    }
  }
  return (
    <div className="p-2 md:p-4 w-5/6 mx-auto min-h-screen">
      <div className="h-20"></div>
      <h1 className="p-4 text-black dark:text-white">Consumables</h1>
      <button onClick = {() => console.log(fetchData('food'))}>Fetch Data</button>
      
    </div>
  )
}

export default Consumables