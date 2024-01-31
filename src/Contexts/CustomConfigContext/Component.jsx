import { assign } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import CustomConfigContext from 'src/Contexts/CustomConfigContext/Context'
import pokeStore from 'src/pokeStore'

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

CustomConfigContextComponent.propTypes = {
  children: PropTypes.object,
}

export default CustomConfigContextComponent
