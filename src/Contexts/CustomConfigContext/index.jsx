import React, { useState, useContext, useEffect } from 'react'
import pokeStore from 'src/pokeStore'

const CustomConfigContext = React.createContext()

export const useCustomConfig = () => {
  return useContext(CustomConfigContext)
}

const CustomConfigContextComponent = ({ children }) => {
  const [customConfig, setCustomConfig] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    pokeStore
      .getItem('pokettrpg-custom-config')
      .then(setCustomConfig)
      .then(() => setIsLoading(false))
  }, [])

  const setCustomConfigWrapped = value =>
    pokeStore.setItem('pokettrpg-custom-config', value).then(setCustomConfig)
  return (
    <CustomConfigContext.Provider
      value={[{ ...customConfig, isLoading }, setCustomConfigWrapped]}
    >
      {children}
    </CustomConfigContext.Provider>
  )
}

export default CustomConfigContextComponent
