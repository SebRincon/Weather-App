import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import { fetchOpenWeatherData } from '../utils/api'




const App: React.FC<{}> = () => {

  useEffect(() => { 
    fetchOpenWeatherData('Houston')
      .then((data) => console.log(data.main.temp))
      .catch((err) => console.log('ERROR'))
  }, [])
  return (
    <div>
      <img src="icon.png" />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
