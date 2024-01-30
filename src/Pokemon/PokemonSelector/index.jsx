import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { values } from 'lodash'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { sanitizeString } from 'src/utils.js'
import 'src/Pokemon/PokemonSelector/pokemonSelector.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

//TODO: change selectedVariety to selectedVarietyId
const PokemonSelector = ({
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

  //TODO: Remove
  console.log(Pokedex.pokemonData)

  const getSelectedPokemonData = pokemon => {
    setSelected(pokemon)
    if (pokemon.length > 0) {
      onPokemonStateChange({
        species: pokemon[0],
        selectedVariety: pokemon[0].defaultVarietyId,
      })
    }
  }
  const updateSelectedVariety = pokemon => {
    setSelectedVariety(pokemon)
    if (pokemon.length > 0) {
      onPokemonStateChange({
        species: selected[0],
        selectedVariety: pokemon[0].id,
      })
    }
  }

  return (
    <>
      <div>
        <span className="name-label">Species:</span>
        <Typeahead
          clearButton
          className="name-input"
          id="basic-typeahead-single"
          labelKey="name"
          onChange={getSelectedPokemonData}
          options={values(Pokedex.pokemonData.species) || []}
          placeholder="Who's that Pokemon?!"
          selected={selected}
        />
      </div>
      {species && values(species.varieties).length > 1 && (
        <div>
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
