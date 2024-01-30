import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Pokedex } from 'pokeapi-js-wrapper'
import axios from 'axios'
import { setItemWithCache, getItemFromCache } from 'src/pokeStore'
import queryForAll from 'src/Contexts/PokedexContext/queryForAll'
import mapPokemonData from 'src/Contexts/PokedexContext/mapPokemonData'

const PokedexContext = React.createContext()

const PokedexInstance = new Pokedex({ cacheImages: true, })

const doQueryForAll = () =>
  axios({
    url: 'https://beta.pokeapi.co/graphql/v1beta',
    method: 'post',
    data: {
      query: queryForAll,
    },
  }).then(({ data: { data, }, }) => {
    setItemWithCache('pokettrpg-all-data', data)
    return data
  })

export const usePokedex = () => {
  return useContext(PokedexContext)
}

const PokedexContextComponent = ({ children, }) => {
  const [pokemonData, setPokemonData,] = useState({})
  const [isLoading, setIsLoading,] = useState(true)

  useEffect(() => {
    getItemFromCache('pokettrpg-all-data')
      .then(value => {
        if (value) {
          return Promise.resolve(value)
        } else {
          return doQueryForAll()
        }
      })
      .then(mapPokemonData)
      .then(setPokemonData)
      .then(() => setIsLoading(false))
  }, [])

  return (
    <PokedexContext.Provider value={{ isLoading, pokemonData, }}>
      {children}
    </PokedexContext.Provider>
  )
}

export default PokedexContextComponent
