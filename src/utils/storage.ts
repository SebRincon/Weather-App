export interface LocalStorage{ 
    citites?: string[]
}

//? This is a type that can only be of types form Local storage
//? Example: 
//?     citites ?: string[]
//?     anotherField ?: string[]
//? keyof -->  'cities' | 'anotherField'

export type LocalStorageKey = keyof LocalStorage 

export function setStoredCities(citites: string[]): Promise<void> {
    console.log('Setting Cities')
    console.log(citites)
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

export function getStoredCitites(): Promise<string[]> { 
    console.log('Getting Cities')
    const keys: LocalStorageKey[] = ['citites']
    return new Promise((resolve) => { 
        chrome.storage.local.get(keys, (res: LocalStorage) => { 
            resolve( res.citites ?? [] ) //? When the function finishes it will return the citites list
        })
    })
}