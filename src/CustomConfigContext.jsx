import React, { useState, useContext } from 'react'

const CustomConfigContext = React.createContext()

export const useCustomConfig = () => {
  return useContext(CustomConfigContext)
}

export default ({ children }) => {
  const [customConfig, setCustomConfig] = useState({})
  return (
    <CustomConfigContext.Provider value={[customConfig, setCustomConfig]}>
      {children}
    </CustomConfigContext.Provider>
  )
}
