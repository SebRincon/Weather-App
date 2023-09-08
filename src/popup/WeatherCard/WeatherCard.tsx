import React, { useEffect } from 'react'
import { fetchOpenWeatherData } from '../../utils/api'


// Setup react component w/ a required prop called city
const WeatherCard: React.FC<{
    city: string
}> = ({ city }) => { 
    useEffect(() => {
      fetchOpenWeatherData(city)
        .then((data) => console.log(data.main.temp))
        .catch((err) => console.log('ERROR'))
    }, [city])

    return <div >{ city }</div>
}


export default WeatherCard