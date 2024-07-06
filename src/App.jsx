import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true)
        await axios.get('https://api.genshin.dev/', {headers : {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"      
      }})
        .then(res => {
          console.log(res)
          setData(res)
        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div>
        <button onClick={() => console.log(data)}>
          Get data.
        </button>
      </div>
      <h1>Genshin Impact Data Hub</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
