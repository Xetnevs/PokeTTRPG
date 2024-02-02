import { compact } from 'lodash'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { usePokedex } from 'src/Contexts/PokedexContext'

const MoveSelector = ({
  selectedMove,
  pokemonState: { species, selectedVariety },
  onPokemonStateChange,
}) => {
  const [selected, setSelected] = useState([])
  const Pokedex = usePokedex()

  const movesList = compact(
    species.varieties[selectedVariety].moves.map(move => ({
      ...Pokedex.pokemonData.moves[move.move_id],
      level: move.level,
      learnMethod: move.learn_method.name,
    }))
  )

  useEffect(() => {
    if (selectedMove) {
      setSelected([selectedMove])
    }
  }, [selectedMove])


  useEffect(() => {
      setSelected([])
  }, [species, selectedVariety])

  return (
    <Typeahead
      className="move-input"
      labelKey="name"
      id="MoveSelector"
      clearButton
      onChange={move => {
        setSelected(move)
        if (move?.length) {
          onPokemonStateChange(move)
        }
      }}
      options={movesList || []}
      placeholder="Show me your moves"
      selected={selected || []}
    />
  )
}

MoveSelector.propTypes = {
  selectedMove: PropTypes.object,
  pokemonState: PropTypes.shape({
    species: PropTypes.object,
    selectedVariety: PropTypes.number,
  }).isRequired,
  onPokemonStateChange: PropTypes.func,
}

export default MoveSelector
