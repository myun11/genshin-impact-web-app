import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import ConsumablePreview from '../components/ConsumablePreview'
const Consumables = () => {

  const [foodIds, setFoodIds] = useState([])
  const [foodData, setFoodData] = useState([])
  const [potionIds, setPotionIds] = useState([])
  const [potionData, setPotionData] = useState([])
  const [consumableType, setConsumableType] = useState(true)

  const [loading, setLoading] = useState(true)
  const [selectedName, setSelectedName] = useState("")
  const [filteredArray, setFilteredArray] = useState([])
  const [previewState, setPreviewState] = useState(false)
  const [previewItem, setPreviewItem] = useState([])

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
    <div className="p-2 md:p-4 mx-auto min-h-screen">
      <div className="h-20"></div>
      <h1 className="p-4 text-black dark:text-white">Consumables</h1>

      {/* Filters */}
      <div className = "md:m-4">
        <div className =  " bg-slate-800 dark:bg-slate-500 h-1 w-full"></div>
        <div className="lg:inline-flex content-start m-4 p-4 lg:space-x-7 flex max-lg:flex-col max-lg:space-y-4 items-center justify-center">
            {/* Toggle between Food and Potions */}
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onClick = {() => setConsumableType(prev => !prev)}/>
              <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm md:text-md lg:text-lg font-medium text-black dark:text-gray-300">Toggle Food/Potions</span>
            </label> 
            {/* Filter by element */}

            {/* Filter by name */}
            <div className="relative max-w-xs">
              <label className="sr-only">Search</label>
              <input className="bg-gray-200 ps-9 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 
          focus:border-blue-500 max-lg:w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500" id="consumable-search" type = "string" placeholder={consumableType ? 'Search Food' : 'Search Potion' } onChange = {(e) => setSelectedName(e.target.value)}/>
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                  <svg className="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                  </svg>
              </div>
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

            {/* Toggle between grid and table */}                   
        </div>
        <div className = "bg-slate-800 dark:bg-slate-500 h-1 w-full"></div>
      </div>
      {loading ?
        <Loader loading = {loading}/>
      :
      <div>
      {previewState ?
        <ConsumablePreview
          data = {previewItem}
          setPreviewState = {setPreviewState}
        /> :
        <div className = "lg:w-5/6 2xl:w-4/5 lg:mx-auto grid max-md:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2 md:gap-4">
        {consumableType && foodIds.map(id => {
          if (id != "chili-minced-cornbreaad-buns" && id != "dizziness-be-gone-no-jutsu-version-2.0" && id != "nutritious-meal-(v.593)" && foodData[id]["name"].toLowerCase().includes(selectedName)) {
            if (foodData[id]["rarity"] == 1) {
              return(
                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-gray-500 hover:border-gray-500 transition duration-300 ease-in-out">
                    <button className = "bg-gradient-to-b from-gray-500 to-white" >
                      <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/food/' + id} onClick = {() => {
                      // setPreviewState(true)
                      // setPreviewItem(foodData[id])
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
                      // setPreviewState(true)
                      // setPreviewItem(foodData[id])
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
                      // setPreviewState(true)
                      // setPreviewItem(foodData[id])
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
                    // setPreviewState(true)
                    // setPreviewItem(foodData[id])
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
                    // setPreviewState(true)
                    // setPreviewItem(foodData[id])
                  }}/></button>
                  <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{foodData[id]["name"]}</h2>
                </div>
              )
            }
          }
        })}
        {!consumableType && potionIds.map(id => {
          if (id != "chili-minced-cornbreaad-buns" && id != "dizziness-be-gone-no-jutsu-version-2.0" && id != "nutritious-meal-(v.593)" && potionData[id]["name"].toLowerCase().includes(selectedName)) {
            if (potionData[id]["rarity"] == 1) {
              return(
                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-gray-500 hover:border-gray-500 transition duration-300 ease-in-out">
                    <button className = "bg-gradient-to-b from-gray-500 to-white" >
                      <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/potions/' + id} onClick = {() => {
                      // setPreviewState(true)
                      // setPreviewItem(foodData[id])
                    }}/></button>
                    <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{potionData[id]["name"]}</h2>
                </div>
              )
            }
            if (potionData[id]["rarity"] == 2) {
              return(
                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-green-500 hover:border-green-500 transition duration-300 ease-in-out">
                    <button className = "bg-gradient-to-b from-green-500 to-white" >
                      <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/potions/' + id} onClick = {() => {
                      // setPreviewState(true)
                      // setPreviewItem(foodData[id])
                    }}/></button>
                    <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{potionData[id]["name"]}</h2>
                </div>
              )
            }
            if (potionData[id]["rarity"] == 3) {
              return(
                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-300 ease-in-out">
                    <button className = "bg-gradient-to-b from-blue-500 to-white" >
                      <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/potions/' + id} onClick = {() => {
                      // setPreviewState(true)
                      // setPreviewItem(foodData[id])
                    }}/></button>
                    <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{potionData[id]["name"]}</h2>
                </div>
              )
            }
            if (potionData[id]["rarity"] == 4) {
              return(
                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-purple-500 hover:border-purple-500 transition duration-300 ease-in-out">
                  <button className = "bg-gradient-to-b from-purple-500 to-white" >
                    <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/potions/' + id} onClick = {() => {
                    // setPreviewState(true)
                    // setPreviewItem(foodData[id])
                  }}/></button>
                  <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{potionData[id]["name"]}</h2>
                </div>
              )
            }
            if (potionData[id]["rarity"] == 5) {                   
              return(
                <div className = "border-4 border-black dark:border-white w-full h-full rounded-lg hover:bg-orange-500 hover:border-orange-500 transition duration-300 ease-in-out">
                  <button className = "bg-gradient-to-b from-orange-500 to-white" >
                    <img className="w-full h-full rounded-lg " src = {'https://genshin.jmp.blue/consumables/potions/' + id} onClick = {() => {
                    // setPreviewState(true)
                    // setPreviewItem(foodData[id])
                  }}/></button>
                  <h2 className = "capitalize text-black dark:text-white min-h-8 flex justify-center align-middle">{potionData[id]["name"]}</h2>
                </div>
              )
            }
          }
        })}
        </div>


      }
      </div>
      }
          
    </div>
  )
}

export default Consumables