import { setStoredCities } from "../utils/storage";
chrome.runtime.onInstalled.addListener(() => {
  //? Setting Default Values When Installed
  setStoredCities(['Houston'])
})
