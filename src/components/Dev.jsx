import React, {useState} from 'react'
import axios from 'axios'
import Loader from './Loader'
const Dev = (props) => {
  const [loading, setLoading] = useState(true)
  return (
    <div>
        <h1>Dev</h1>
        working 2
        <div>
          <button onClick = {() => {
            setLoading(prev => !prev)
            console.log(loading)
            }}>loading</button>
          <Loader
            loading = {loading}
          />
        </div>
        {/* <div>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/circlet-of-logos/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/flower-of-life/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/goblet-of-eonothem/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/plume-of-death/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/sands-of-eon/"/>
        </div> */}
        <div className="relative bg-slate-200 dark:bg-slate-800 p-4 align-middle justify-center text-black dark:text-white w-screen min-h-screen">
          <div class="absolute inset-0 top-40 z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            <div className = "rounded-lg h-56 bg-black w-1/2 min-h-screen">
eeeees
            </div>
          </div>
        </div>

        <div>
            {
              props.types.map(entry => {
                return(
                  <div>
                    <button onClick = {async () => {
                      try{
                        await axios.get('https://genshin.jmp.blue/' + entry + '/food/')
                        .then(res => console.log(res.data))
                        
                      } catch (error) {
                        console.log(error)
                      }
                    }}> {entry} </button>
                  </div>
                )
              })
            }
          </div>
    
    </div>
  )
}

export default Dev