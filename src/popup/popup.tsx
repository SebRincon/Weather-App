import React, { useState, useEffect} from 'react'
import WeatherCard from './WeatherCard'
import { createRoot } from 'react-dom/client'
import { Add as AddIcon } from '@material-ui/icons'
import { setStoredCities, getStoredCitites } from '../utils/storage'
import { Grid, Box, InputBase, IconButton, Paper, Icon } from '@material-ui/core'
import 'fontsource-roboto'
import './popup.css'


const App: React.FC<{}> = () => {
  
  const [cityInput, setCityInput] = useState<string>('')
  const [cities, setCities] = useState<string[]>([])
  
  //? Fetching data from storage on open
    useEffect(() => { 
      getStoredCitites().then(cities => {
        setCities(cities)
      })
    }, [])

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1) // splice will delete the value in the list
    const updatedCitites = [...cities]
    setStoredCities(updatedCitites).then(() => {
      setCities(updatedCitites) // We then update the state with the new list
    })  
  }

  const handleCityButtonClick = () => { 
    if (cityInput === '') { 
      return
    }
    const updatedCitites = [...cities, cityInput]
    setStoredCities(updatedCitites).then(() => { 
      setCities(updatedCitites)
      setCityInput('')
    })
  }

  return (

    // ? Input Structure
    <Box mx={'8px'} my={'16px'}>
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => {
                  setCityInput(event.target.value)
                }}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/*  Mapping the cities from a list  */}
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height={'16px'}></Box>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
