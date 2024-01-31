import axios from 'axios'
import { Pokedex } from 'pokeapi-js-wrapper'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import PokedexContext from 'src/Contexts/PokedexContext/Context'
import mapPokemonData from 'src/Contexts/PokedexContext/mapPokemonData'
import queryForAll from 'src/Contexts/PokedexContext/queryForAll'
import { getItemFromCache, setItemWithCache } from 'src/pokeStore'

const doQueryForAll = () =>
  axios({
    url: 'https://beta.pokeapi.co/graphql/v1beta',
    method: 'post',
    data: {
      query: queryForAll,
    },
  }).then(({ data: { data } }) => {
    setItemWithCache('pokettrpg-all-data', data)
    return data
  })

const PokedexContextComponent = ({ children }) => {
  const [pokemonData, setPokemonData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    new Pokedex({ cacheImages: true })
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
    <PokedexContext.Provider value={{ isLoading, pokemonData }}>
      {children}
    </PokedexContext.Provider>
  )
}

PokedexContextComponent.propTypes = {
  children: PropTypes.object,
}

export default PokedexContextComponent
