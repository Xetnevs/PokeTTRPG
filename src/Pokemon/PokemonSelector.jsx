import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { values } from 'lodash'
import { usePokedex } from 'src/PokedexContext.jsx'
import { sanitizeString } from 'src/utils.js'
import 'react-bootstrap-typeahead/css/Typeahead.css'

const PokemonSelector = ({
  setPokemonData,
  pokemonState: { species, selectedVariety },
  onPokemonStateChange,
}) => {
  const Pokedex = usePokedex()
  const [selected, setSelected] = useState([])
  const [selectedVariety2, setSelectedVariety] = useState([])
  // const [pokemonList, setPokemonList] = useState()

  useEffect(() => {
    if (species) {
      setSelected([species])
      setSelectedVariety([species.varieties[selectedVariety]])
    }
  }, [species, selectedVariety])

  // useEffect(() => {
  //   if (!pokemonList) {
  //     Pokedex.getPokemonsList().then(pokemon => {
  //       setPokemonList(
  //         pokemon.results.map(pokemon => ({
  //           ...pokemon,
  //           name: sanitizeString(pokemon.name),
  //         }))
  //       )
  //     })
  //   }
  // })

  console.log(Pokedex.pokemonData)

  const getSelectedPokemonData = pokemon => {
    setSelected(pokemon)
    if (pokemon.length > 0) {
      onPokemonStateChange({
        species: pokemon[0],
        selectedVariety: pokemon[0].defaultVarietyId,
      })
      setPokemonData(pokemon[0])
      // Pokedex.resource(pokemon[0].url).then(setPokemonData)
    }
  }
  const updateSelectedVariety = pokemon => {
    setSelectedVariety(pokemon)
    if (pokemon.length > 0) {
      onPokemonStateChange({
        selectedVariety: pokemon[0].id,
      })
    }
  }

  return (
    <>
      <div className="label-input-pair">
        <span className="name-label">Species:</span>
        <Typeahead
          clearButton
          className="name-input"
          id="basic-typeahead-single"
          labelKey="name"
          onChange={getSelectedPokemonData}
          options={values(Pokedex.pokemonData.species) || []}
          placeholder="Whose that Pokemon?!"
          selected={selected}
        />
      </div>
      {species && values(species.varieties).length > 0 && (
        <div className="label-input-pair">
          <span className="name-label">Variety:</span>
          <Typeahead
            clearButton
            className="name-input"
            id="basic-typeahead-single-2"
            labelKey="name"
            onChange={updateSelectedVariety}
            options={values(species.varieties)}
            placeholder="Choose Variety"
            selected={selectedVariety2}
          />
        </div>
      )}
    </>
  )
}

export default PokemonSelector
