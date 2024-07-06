import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Characters from './components/Characters';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('Home')
  const [characters, setCharacters] = useState([])
  const types = [
    'artifacts',
    'boss',
    'characters',
    'consumables',
    'domains',
    'elements',
    'enemies',
    'materials',
    'nations',
    'weapons'
  ]

  const fetchData = async (text) => {
    try{
      setLoading(true)
      await axios.get('https://genshin.jmp.blue/characters' + text)
      .then(res => {
        // console.log(res.data)
        setCharacters(res.data)
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData('')
  }, [])
  return (
    <>
    {loading ? 
    <div>
      Loading Page
    </div> :
    <div>
      {/* Navbar */}
      <button onClick = {() => setPage('Home')}>Home</button>
      <button onClick = {() => setPage('Characters')}>Characters</button>
      <button onClick = {() => setPage('Weapons')}>Weapons</button>
      <button onClick = {() => setPage('Dev')}>Dev</button>

      {/* Home */}
      {page == 'Home' && 
      <div>
        <h1>Genshin Impact Data Hub</h1>
      </div>  
      }

      {/* Characters */}
      {page == 'Characters' &&
        <Characters characters = {characters}/>
      }
      
      {/* Dev */}
      {page == 'Dev' &&
      <div>
        <button onClick={() => console.log(data)}>
          Get data.
        </button>
        {
          types.map(entry => {
            return(
              <div>
                <button onClick = {() => {
                  fetchData(entry)
                }}> {entry} </button>
              </div>
            )
          })
        }
      </div>
      }
    </div>
    }
    </>
  )
}

export default App
