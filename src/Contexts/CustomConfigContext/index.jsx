import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from 'react'
import { assign, isEqual } from 'lodash'
import pokeStore from 'src/pokeStore'

const CustomConfigContext = React.createContext(null)

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

  const setCustomConfigWrapped = useCallback(
    value => {
      const merged = assign(customConfig, value)
      setCustomConfig({ ...merged })
      pokeStore.setItem('pokettrpg-custom-config', merged)
    },
    [customConfig]
  )

  return (
    <CustomConfigContext.Provider
      value={[{ ...customConfig, isLoading }, setCustomConfigWrapped]}
    >
      {children}
    </CustomConfigContext.Provider>
  )
}

export default CustomConfigContextComponent
