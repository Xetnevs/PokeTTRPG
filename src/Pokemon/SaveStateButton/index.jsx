import 'src/Pokemon/SaveStateButton/saveButton.css'

import exportFromJSON from 'export-from-json'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const getActivePokemonConfig = (pokemonState, customConfig) => {
  const foundPokemon = customConfig.pokemon?.[pokemonState?.species?.id]
  const pokemonCustom = foundPokemon
    ? { [pokemonState?.species?.id]: foundPokemon }
    : {}
  const movesCustom = pokemonState.selectedMoves?.reduce((acc, move) => {
    const foundMove = customConfig.moves?.[move.id]
    return foundMove ? { ...acc, [move.id]: foundMove } : { ...acc }
  }, {})
  const selectedAbilityId =
    pokemonState?.species?.varieties?.[pokemonState.selectedVariety]
      ?.abilities?.[pokemonState.selectedAbility || 1]?.id
  const abilityText = customConfig.abilities?.[selectedAbilityId] || ''

  const abilityCustom = abilityText ? { [selectedAbilityId]: abilityText } : {}

  return {
    pokemon: pokemonCustom,
    moves: movesCustom,
    abilities: abilityCustom,
  }
}

const SaveStateButton = ({ pokemonState }) => {
  const [customConfig, _] = useCustomConfig()
  return (
    <>
      {!isEmpty(pokemonState) && (
        <button
          className="save-button"
          onClick={() =>
            exportFromJSON({
              data: {
                pokemonState,
                customConfig: getActivePokemonConfig(
                  pokemonState,
                  customConfig
                ),
              },
              fileName: 'poke',
              exportType: exportFromJSON.types.json,
            })
          }
        >
          <img src="/save.svg" />
        </button>
      )}
    </>
  )
}

SaveStateButton.propTypes = {
  pokemonState: PropTypes.object.isRequired,
}

export default SaveStateButton
