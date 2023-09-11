import React, { useEffect, useState } from 'react'
import {
  OpenWeatherData,
  OpenWeatherTemp,
  fetchOpenWeatherData,
} from '../../utils/api'
import {
  Box,
  Card,
  Button,
  CardContent,
  CardActions,
  Typography,
} from '@material-ui/core'
import './WeatherCard.css'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode //? Special type that means any react components
  onDelete?: () => void // ? Setting optional void function as prop
}> = ({ children, onDelete }) => {
  {
    /* Box component w/ margin x & y */
  }
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        {/*Setting the onDelete Function to a button on the card  */}
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              <Typography className="weatherCard-body">Delete</Typography>
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

// Setup react component w/ a required prop called city
const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTemp
  onDelete?: () => void // Passing the onDelete function down from the WeatherCardContainer
}> = ({ city, tempScale, onDelete }) => {
  // Destructure the funciton onDelete
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>('loading')
  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => setCardState('error'))
  }, [city, tempScale])

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        {/* //? Passing the onDelete function to the CardContainer */}
        <Typography className="weatherCard-body">
          {cardState == 'loading'
            ? 'Loading... '
            : `Error - Not retreive data for the city: ${city}`}
        </Typography>
      </WeatherCardContainer>
    )
  }

  // Card UI Creation
  return (
    <>
      {/* //? Passing the onDelete function to the CardContainer */}
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">
          {weatherData.name}
        </Typography>
        <Typography className="weatherCard-body">
          {Math.round(weatherData.main.temp)}
        </Typography>
        <Typography className="weatherCard-body">
          Feels Like: {Math.round(weatherData.main.feels_like)}
        </Typography>
      </WeatherCardContainer>
    </>
  )
}

export default WeatherCard
