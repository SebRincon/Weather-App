
// Setup API Key
const OPEN_WEATHER_API_KEY = 'c2962b051e03a4dea8428a9f174bbce7'

export interface OpenWeatherData {
  name: String
  main: {
    temp:number
    feels_like:number
    temp_min:number
    temp_max:number
    pressure:number
    humidity:number
  }
  weather: {
    description: string,
    icon: string,
    id: number,
    main:string
  }[] // weather is an array of the object notated above
  wind: {
    speed: number,
    degree: number
  }
}

export type OpenWeatherTemp = 'metric' | 'imperial'

// Async function to fetch weather
export async function fetchOpenWeatherData(city: String, tempScale: OpenWeatherTemp): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  )

  if (!res.ok) {
    throw new Error('City not found')
  }
  const data: OpenWeatherData = await res.json()
  return data
}