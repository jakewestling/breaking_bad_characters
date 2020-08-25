import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import './App.css'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchItems = async() => {
      setIsLoading(true)
      const result = await axios(
        `https://breakingbadapi.com/api/characters?name=${query}`
        )

      // console.log(result.data)
      
      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query])

  return (
    <Router>
      <div className="container">
        <Route exact path="/" render={props => (
          <React.Fragment>
            <Header />
            <Search getQuery={(q) => setQuery(q)} />
            <CharacterGrid isLoading={isLoading} items={items} />
          </React.Fragment>
        )} />
        
      </div> 
    </Router>
     

  )
}

export default App