import { createRoot } from 'react-dom/client'
import WeatherCard from './WeatherCard'
import 'fontsource-roboto'
import React, { useState } from 'react'
import './popup.css'
import { Grid, Box, InputBase, IconButton, Paper, Icon } from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'


const App: React.FC<{}> = () => {

  const [cityInput, setCityInput] = useState<string>('')
  const [cities, setCities] = useState<string[]>([
    'Houston',
    'New York',
    'Error'
  ])
  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1) // splice will delete the value in the list 
    setCities([...cities]) // We then update the state with the new list
  }

  const handleCityButtonClick = () => { 
    if (cityInput === '') { 
      return
    }
    setCities([...cities, cityInput])
    setCityInput('')
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
