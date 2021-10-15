import React from 'react'
import { db } from '../firebase'

const DataContext = React.createContext()

export function useData() {
    return useContext(DataContext)
}

export const DataContext = () => {

    const value = {
        posts,
        users,
        categories,
        states
    }

    

    

    return (
       <DataContext.Provider value={value}>

       </DataContext.Provider>
    )
}
