import { setStoredCities, setStoredOptions } from "../utils/storage";
chrome.runtime.onInstalled.addListener(() => {
  //? Setting Default Values When Installed
  setStoredCities(['Houston'])
  setStoredOptions({
    hasAutoOverlay: false,
    homeCity: '',
    tempScale: 'metric'
  })
})
