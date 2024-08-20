import { useState, useEffect } from 'react'
import './App.css'
import './output.css'
import axios from 'axios';
import Characters from './components/Characters';
import Footer from './components/Footer';
import Home from './components/Home';
import Theme from './components/Theme';
import Weapons from './components/Weapons';
import Dev from './components/Dev';
import Loader from './components/Loader';
import Artifacts from './components/Artifacts';
import Consumables from './components/Consumables';
import Navbar from './components/Navbar';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('Home')
  const [characters, setCharacters] = useState([])
  const [masterCharacterDataMap, setMasterCharacterDataMap] = useState([])
  const [masterCharacterDataArray, setMasterCharacterDataArray] = useState([])
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

  const fetchData = async (header) => {
    try{
      setLoading(true)
      await axios.get('https://genshin.jmp.blue/' + header)
      .then(res => {
        setCharacters(res.data)
        const api_data_map = new Map()
        const api_data_array = []
        res.data.map(async char => {
          try {
            await axios.get('https://genshin.jmp.blue/characters/' + char)
            .then(res => {
              api_data_map[char] = res.data
              api_data_array.push(res.data)
            })
          } catch (error) {
            console.log("Error getting API: ", error)
          }
        })
        setMasterCharacterDataMap(api_data_map)
        setMasterCharacterDataArray(api_data_array)
      }).finally(() => {
        setLoading(false)
      }
        
      )
    } catch (error) {
      // setLoading(false)
      console.log(error)
    }
  }
  const getCharacterDataAll = async () => {
    const api_data = new Map();
    console.log("working")
    await characters.map(char => {
        try {
            axios.get('https://genshin.jmp.blue/characters/' + char)
            .then(res => api_data[char] = res.data)
        } catch (error) {
            console.log("Error getting API: ", error)
        }
        
    })
    setMasterCharacterDataMap(api_data)  
  }
  useEffect(() => {
    fetchData('characters')
    // .then(() => getCharacterDataAll())
  }, [])
  return (
    <div className="">
      <div className="">
        {/* Navbar */}

      </div>
      
    {loading ?
      <div>
        <Loader
          loading = {loading}
        />
      </div> :
      <div className='mx-auto h-10 min-h-screen flex-grow'>
        <Navbar
          setPage = {setPage}
        />
        <div className = "">
          {/* Home */}
          {page == 'Home' && 
          <div className = "">
            <Home />
          </div>  
          }

          {/* Characters */}
          {page == 'Characters' &&
            <Characters 
              characters = {characters}
              masterCharacterDataMap = {masterCharacterDataMap}
              masterCharacterDataArray = {masterCharacterDataArray}
              loading = {loading}
            />
          }

          {/* Weapons */}
          {page == 'Weapons' &&
            <Weapons/>
          }

          {/* Artifacts */}
          {page == 'Artifacts' &&
            <Artifacts/>
          }

          {/* Food */}
          {page == 'Consumables' &&
            <Consumables/>
          }
        
          {/* Dev */}
          {page == 'Dev' &&
          <Dev
            types = {types}
          />
          
          }
        
        </div>

        {/* Footer */}
        <div className=''>
          <Footer/>
        </div>
      </div>
      }
      
    </div>
  )
}

export default App
