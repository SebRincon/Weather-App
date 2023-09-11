import { OpenWeatherTemp } from "./api"
export interface LocalStorage{ 
    citites?: string[]
    options?: LocalStorageOptions
}

export interface LocalStorageOptions {
    homeCity: string
    tempScale: OpenWeatherTemp
}

//? This is a type that can only be of types form Local storage
//? Example: 
//?     citites ?: string[]
//?     anotherField ?: string[]
//? keyof -->  'cities' | 'anotherField'

export type LocalStorageKeys = keyof LocalStorage 

export function setStoredCities(citites: string[]): Promise<void> {
    const vals: LocalStorage = {
        citites
    }
    return new Promise((resolve) => { 
        chrome.storage.local.set(
        vals,
        () => { resolve() }) //? Resolve function will be called when the function finishes
                             //? this is how the function knows it is done
    })
}

export function getStoredCities(): Promise<string[]> { 
    const keys: LocalStorageKeys[] = ['citites']
    return new Promise((resolve) => { 
        chrome.storage.local.get(keys, (res: LocalStorage) => { 
            resolve( res.citites ?? [] ) //? When the function finishes it will return the citites list
        })
    })
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> { 
    const vals: LocalStorage = {
        options
    }
    return new Promise((resolve) => {
        chrome.storage.local.set(
            vals,
            () => { resolve() })
    })
}

export function getStoredOptions(): Promise<LocalStorageOptions> { 
    const keys: LocalStorageKeys[] = ["options"]
    return new Promise((resolve) => { 
        chrome.storage.local.get(keys, (res: LocalStorage) => { 
            resolve(res.options)
        })
    })
}
