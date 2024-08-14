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
        <div>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/circlet-of-logos/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/flower-of-life/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/goblet-of-eonothem/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/plume-of-death/"/>
          <img src = "https://genshin.jmp.blue/artifacts/berserker/sands-of-eon/"/>
        </div>
        <div>
            {
              props.types.map(entry => {
                return(
                  <div>
                    <button onClick = {async () => {
                      try{
                        // await axios.get('https://genshin.jmp.blue/' + entry)
                        await axios.get('https://genshin.jmp.blue/artifacts/berserker/')
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