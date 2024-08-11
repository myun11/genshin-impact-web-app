import React from 'react'
import axios from 'axios'

const Dev = (props) => {
  return (
    <div>
        <h1>Dev</h1>
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