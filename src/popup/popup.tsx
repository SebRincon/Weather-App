import { createRoot } from 'react-dom/client'
import WeatherCard from './WeatherCard'
import 'fontsource-roboto'
import React from 'react'
import './popup.css'



const App: React.FC<{}> = () => {


  return (
    <div>
    <WeatherCard city='Houston'/>
    <WeatherCard city='New York'/>
    <WeatherCard city='dasldl'/>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
