import React, {useState} from 'react'
import axios from 'axios'
import Loader from './Loader'
const Dev = (props) => {
  const [loading, setLoading] = useState(true)
  return (
    <div>
        <h1>Dev</h1>

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
            {
              props.types.map(entry => {
                return(
                  <div>
                    <button onClick = {async () => {
                      try{
                        await axios.get('https://genshin.jmp.blue/' + entry)
                        .then(res => {
                          console.log(res)
                        })
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