import React, { useState, useEffect, useContext, useMemo } from 'react'
import { sanitizeString } from 'src/utils.js'
import parseEvolution from 'src/parseEvolution'
import { Pokedex } from 'pokeapi-js-wrapper'
import { request } from 'graphql-request'
import localForage from 'localforage'
import queryForAll from 'src/queryForAll'

const BASE_STAT_DIVIDER = 20

const pokettrpgStore = localForage.createInstance({
  name: 'pokettrpg',
})

const PokedexContext = React.createContext()

const PokedexInstance = new Pokedex()
const myPokedex = {
  resource: PokedexInstance.resource,
  getPokemonsList: PokedexInstance.getPokemonsList,
}

const doQueryForAll = () =>
  request('https://beta.pokeapi.co/graphql/v1beta', queryForAll).then(data => {
    pokettrpgStore.setItem('pokettrpg-all-data', data)
    return data
  })

const mapData = pokemonData => ({
  ...pokemonData,
  species: pokemonData.species.reduce(
    (acc, species) => ({
      ...acc,
      [species.id]: {
        ...species,
        name: sanitizeString(species.name),
        nameRaw: species.name,
        defaultVarietyId: species.varieties.find(poke => poke.is_default).id,
        varieties: species.varieties.reduce(
          (acc, variety) => ({
            ...acc,
            [variety.id]: {
              ...variety,
              name: sanitizeString(variety.name),
              nameRaw: variety.name,
              evolvesTo: parseEvolution(
                species,
                pokemonData.species,
                variety.name
              ),
              abilities: variety.abilities.reduce(
                (acc, { slot, ability }) => [
                  ...acc.slice(0, slot - 1),
                  {
                    ...ability,
                    name: sanitizeString(ability.name),
                  },
                  ...acc.slice(slot),
                ],
                []
              ),
              base_stats: variety.base_stats.reduce(
                (acc, { value, stat: { name } }) => ({
                  ...acc,
                  [name]: Math.floor(value / BASE_STAT_DIVIDER),
                }),
                {}
              ),
              sprites: variety.sprites[0].sprites,
              types: variety.types.map(({ type }) => type.name),
            },
          }),
          {}
        ),
      },
    }),
    {}
  ),
  types: pokemonData.types.reduce(
    (acc, type) => ({
      ...acc,
      [type.name]: pokemonData.types.reduce((acc, { name, efficacies }) => {
        const foundEfficancy =
          efficacies.find(eff => eff.type.name === type.name)?.damage_factor /
          100
        return foundEfficancy
          ? {
              ...acc,
              [name]: foundEfficancy,
            }
          : { ...acc }
      }, {}),
    }),
    {}
  ),
})

export const usePokedex = () => {
  return useContext(PokedexContext)
}

export default ({ children }) => {
  const [pokemonData, setPokemonData] = useState({})
  useEffect(() => {
    pokettrpgStore.ready().then(() =>
      pokettrpgStore
        .getItem('pokettrpg-all-data')
        .then(value => {
          if (value) {
            return Promise.resolve(value)
          } else {
            return doQueryForAll()
          }
        })
        .then(mapData)
        .then(setPokemonData)
    )
  }, [])
  return (
    <PokedexContext.Provider value={{ ...myPokedex, pokemonData }}>
      {children}
    </PokedexContext.Provider>
  )
}
