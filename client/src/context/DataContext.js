import React from 'react'


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
