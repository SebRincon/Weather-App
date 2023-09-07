
// Setup API Key
const OPEN_WEATHER_API_KEY = 'c2962b051e03a4dea8428a9f174bbce7'



// Async function to fetch weather
export async function fetchOpenWeatherData(city: String): Promise<any> { 
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    )

    if (!res.ok) { 
        throw new Error('City not found')
    }
  const data = await res.json()
    return data
}