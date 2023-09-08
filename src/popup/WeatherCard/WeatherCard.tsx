import React, { useEffect, useState } from 'react'
import { OpenWeatherData, fetchOpenWeatherData } from '../../utils/api'
import {Box, Card, CardContent, Typography} from '@material-ui/core'

// Setup react component w/ a required prop called city
const WeatherCard: React.FC<{
    city: string
}> = ({ city }) => { 
    const [weatherData, setWeatherData] = useState<OpenWeatherData|null>(null)
    useEffect(() => {
      fetchOpenWeatherData(city)
        .then((data) => setWeatherData(data))
        .catch((err) => console.log('ERROR'))
    }, [city])


    if (!weatherData) {
            return <div>Loading </div>
        }

    // Card UI Creation
    return (
      <>
        {/* Box component w/ margin x & y */}
        <Box mx={'4px'} my={'16px'}>
          <Card>
            {
              <CardContent>
                <Typography variant="h5">{weatherData.name}</Typography>
                <Typography variant="body1">
                  {Math.round(weatherData.main.temp)}
                </Typography>
                <Typography variant="body1">
                  Feels Like: {Math.round(weatherData.main.feels_like)}
                </Typography>
              </CardContent>
            }
          </Card>
        </Box>
      </>
    )
}


export default WeatherCard