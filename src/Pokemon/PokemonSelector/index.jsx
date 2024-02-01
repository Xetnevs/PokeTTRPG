import 'src/Pokemon/PokemonSelector/pokemonSelector.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

import { values } from 'lodash'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { usePokedex } from 'src/Contexts/PokedexContext'

//TODO: change selectedVariety to selectedVarietyId
//TODO: save speciesId in state, not whole species
const PokemonSelector = ({
  pokemonState: { species, selectedVariety },
  onPokemonStateChange,
}) => {
  const Pokedex = usePokedex()
  const [selected, setSelected] = useState([])
  const [localSelectedVariety, setLocalSelectedVariety] = useState([])

  useEffect(() => {
    if (species) {
      setSelected([species])
      setLocalSelectedVariety([species.varieties[selectedVariety]])
    }
  }, [species, selectedVariety])

  const getSelectedPokemonData = pokemon => {
    setSelected(pokemon)
    if (pokemon.length > 0) {
      const defaultVarietyId = pokemon[0].defaultVarietyId
      onPokemonStateChange({
        species: pokemon[0],
        selectedVariety: defaultVarietyId,
        stats: pokemon[0].varieties[defaultVarietyId].base_stats,
      })
    }
  }
  const updateSelectedVariety = pokemon => {
    setLocalSelectedVariety(pokemon)
    if (pokemon.length > 0) {
      onPokemonStateChange({
        species: selected[0],
        selectedVariety: pokemon[0].id,
      })
    }
  }

  return (
    <>
      <div className={!species ? 'none-selected' : ''}>
        {!species && (
          <img
            className="choose-image"
            src="/poke/assets/Whos-that-Pokemon.png"
          />
        )}
        <span className="name-label">Species:</span>
        <Typeahead
          clearButton
          className="name-input"
          id="basic-typeahead-single"
          labelKey="name"
          onChange={getSelectedPokemonData}
          options={values(Pokedex.pokemonData.species) || []}
          placeholder="I Choose You!"
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
            selected={localSelectedVariety}
          />
        </div>
      )}
    </>
  )
}

PokemonSelector.propTypes = {
  pokemonState: PropTypes.shape({
    species: PropTypes.object,
    selectedVariety: PropTypes.number,
  }).isRequired,
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default PokemonSelector
