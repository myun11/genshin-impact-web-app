import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
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

  const convertNameToId = (text) => {
    return text.replace(' ', '-').toLowerCase()
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="p-2 md:p-4 w-5/6 mx-auto min-h-screen">
      <div className="h-20"></div>
      <h1 className="p-4 text-black dark:text-white">Consumables</h1>
      <div className = "lg:w-4/5 lg:mx-auto grid max-md:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2 md:gap-4">
          {foodIds.map(id => {
            if (id != "chili-minced-cornbreaad-buns" && id != "dizziness-be-gone-no-jutsu-version-2.0" && id != "nutritious-meal-(v.593)") {
              if (foodData[id]["rarity"] == 1) {
                return(
                  <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-gray-500 hover:border-gray-500 transition duration-300 ease-in-out">
                      <button className = "bg-gradient-to-b from-gray-500 to-white" >
                        <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/food/' + id} onClick = {() => {
                        // props.setCharPreviewState(true)
                        // props.setCharPreviewData(entry)
                      }}/></button>
                      <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{foodData[id]["name"]}</h2>
                  </div>
                )
              }
              if (foodData[id]["rarity"] == 2) {
                return(
                  <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-green-500 hover:border-green-500 transition duration-300 ease-in-out">
                      <button className = "bg-gradient-to-b from-green-500 to-white" >
                        <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/food/' + id} onClick = {() => {
                        // props.setCharPreviewState(true)
                        // props.setCharPreviewData(entry)
                      }}/></button>
                      <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{foodData[id]["name"]}</h2>
                  </div>
                )
              }
              if (foodData[id]["rarity"] == 3) {
                return(
                  <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-300 ease-in-out">
                      <button className = "bg-gradient-to-b from-blue-500 to-white" >
                        <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/food/' + id} onClick = {() => {
                        // props.setCharPreviewState(true)
                        // props.setCharPreviewData(entry)
                      }}/></button>
                      <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{foodData[id]["name"]}</h2>
                  </div>
                )
              }
              if (foodData[id]["rarity"] == 4) {
                return(
                  <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-purple-500 hover:border-purple-500 transition duration-300 ease-in-out">
                    <button className = "bg-gradient-to-b from-purple-500 to-white" >
                      <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/food/' + id} onClick = {() => {
                      // props.setCharPreviewState(true)
                      // props.setCharPreviewData(entry)
                    }}/></button>
                    <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{foodData[id]["name"]}</h2>
                  </div>
                )
              }
              if (foodData[id]["rarity"] == 5) {                   
                return(
                  <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-orange-500 hover:border-orange-500 transition duration-300 ease-in-out">
                    <button className = "bg-gradient-to-b from-orange-500 to-white" >
                      <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/food/' + id} onClick = {() => {
                      // props.setCharPreviewState(true)
                      // props.setCharPreviewData(entry)
                    }}/></button>
                    <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{foodData[id]["name"]}</h2>
                  </div>
                )
              }
            }
          })
        }
    </div>
      {/* <button onClick = {() => console.log(foodIds)}>food ids</button>
      <button onClick = {() => console.log(foodData)}>food data</button>
      <button onClick = {() => console.log(potionIds)}>potion ids</button>
      <button onClick = {() => console.log(potionData)}>potion data</button>
      <button onClick = {() => console.log(foodData["a-buoyant-breeze"])}>a buoyant breeze</button>
      <button onClick = {() => {
        const all = []
        foodIds.map(entry => {
          if (entry != "chili-minced-cornbreaad-buns") {
            try {
              Object.keys(foodData[entry]).map(t => all.push(t))
            } catch (error) {
              console.log("error on: ", entry)
            }  
          }
          // console.log(entry)
        })
        console.log(new Set(all))
      }}>test</button> */}
      
    </div>
  )
}

export default Consumables