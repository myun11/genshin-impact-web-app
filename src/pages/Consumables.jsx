import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Consumables = () => {

  const [foodIds, setFoodIds] = useState([])
  const [foodData, setFoodData] = useState([])
  const [potionIds, setPotionIds] = useState([])
  const [potionData, setPotionData] = useState([])

  const [loading, setLoading] = useState(true)

  async function fetchData() {
    const promise1 = axios.get('https://genshin.jmp.blue/consumables/food/list');
    const promise2 = axios.get('https://genshin.jmp.blue/consumables/food/');
    const promise3 = axios.get('https://genshin.jmp.blue/consumables/potions/list');
    const promise4 = axios.get('https://genshin.jmp.blue/consumables/potions/');
    try {
      await Promise.all([promise1, promise2, promise3, promise4])
      .then(([res1, res2, res3, res4]) => {
        setFoodIds(res1.data)
        setFoodData(res2.data)
        setPotionIds(res3.data)
        setPotionData(res4.data)
      }).finally(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("Error getting consumables data: ", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="p-2 md:p-4 w-5/6 mx-auto min-h-screen">
      <div className="h-20"></div>
      <h1 className="p-4 text-black dark:text-white">Consumables</h1>
      <div className = "w-4/5 grid ">

      </div>
      <button onClick = {() => console.log(foodIds)}>food ids</button>
      <button onClick = {() => console.log(foodData)}>food data</button>
      <button onClick = {() => console.log(potionIds)}>potion ids</button>
      <button onClick = {() => console.log(potionData)}>potion data</button>
      
    </div>
  )
}

export default Consumables