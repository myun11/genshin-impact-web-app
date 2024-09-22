import { useState, useEffect } from 'react'
import './App.css'
import './output.css'
import axios from 'axios';
import Footer from './components/Footer';
import Theme from './components/Theme';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

//Pages
import Home from './pages/Home';
import Characters from './pages/Characters';
import Weapons from './pages/Weapons';
import Dev from './pages/Dev';
import Artifacts from './pages/Artifacts';
import Consumables from './pages/Consumables';

function App() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('Home')
  const [characters, setCharacters] = useState([])
  const [masterCharacterDataMap, setMasterCharacterDataMap] = useState([])
  const [masterCharacterDataArray, setMasterCharacterDataArray] = useState([])

  // This is the current character's data that is being previewed.
  const [charPreviewState, setCharPreviewState] = useState(false)
  const [charPreviewData, setCharPreviewData] = useState(false)

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
      .then(async res => {
        setCharacters(res.data)
        // const api_data_array = []
        // res.data.map(async char => {
        //   try {
        //     await axios.get('https://genshin.jmp.blue/characters/' + char)
        //     .then(res => {
        //       api_data_array.push(res.data)
        //     })
        //   } catch (error) {
        //     console.log("Error getting API: ", error)
        //   }
        // })
        // setMasterCharacterDataArray(api_data_array)

        // This method loads the entire array before rendering the grid
        try {
          const endpoints = [...res.data.map(char => axios.get('https://genshin.jmp.blue/characters/' + char))]
          const responses = await Promise.all([...endpoints])
          const data = []
          responses.map(entry => data.push(entry.data))
          setMasterCharacterDataArray(data)
        } catch (error) {
          console.log(error)
        }

      }).finally(() => {
        setInterval(2500)
        setLoading(false)
      })
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
      <div className='min-h-screen grow bg-slate-100 dark:bg-slate-900'>
        <Navbar
          setPage = {setPage}
          setCharPreviewState = {setCharPreviewState}
          setCharPreviewData = {setCharPreviewData}
        />
        <div className = "">
          {/* Home */}
          {page == 'Home' && 
            <Home
              setPage = {setPage}
              setCharPreviewData = {setCharPreviewData}
              setCharPreviewState = {setCharPreviewState}
            />
          }

          {/* Characters */}
          {page == 'Characters' &&
            <Characters 
              characters = {characters}
              masterCharacterDataMap = {masterCharacterDataMap}
              masterCharacterDataArray = {masterCharacterDataArray}
              loading = {loading}
              setPage = {setPage}
              setCharPreviewState = {setCharPreviewState}
              charPreviewState = {charPreviewState}
              setCharPreviewData = {setCharPreviewData}
              charPreviewData = {charPreviewData}
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
