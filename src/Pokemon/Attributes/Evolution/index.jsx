import 'src/Pokemon/Attributes/Evolution/evolution.css'

import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import { usePokedex } from 'src/Contexts/PokedexContext'
import getEvolutionInfo from 'src/Pokemon/Attributes/Evolution/getEvolutionInfo'

//Special cases: TODO: Nosepass (thunder stone), Feebas(2), Kubfu (fix mapping), meltan, duraludon, sinistcha, hydrapple

const getEvolveTo = (species, selectedVariety, customConfig, pokemonData) => {
  if (customConfig.pokemon?.[species.id]?.evolvesTo) {
    return customConfig.pokemon?.[species.id].evolvesTo
  } else {
    const foundInfo = getEvolutionInfo(
      species,
      species.varieties[selectedVariety],
      pokemonData
    )
    return foundInfo
  }
}

const Evolution = ({ pokemonState: { species, selectedVariety } }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  const Pokedex = usePokedex()

  return (
    <div className="evolution-container">
      <AutoHeightTextArea
        className="evolution-text"
        value={getEvolveTo(
          species,
          selectedVariety,
          customConfig,
          Pokedex.pokemonData
        )}
        onChange={e => {
          updateCustomConfig({
            pokemon: {
              [species.id]: { evolvesTo: e.target.value },
            },
          })
        }}
      />

      <div className="evolution-button-container hide-on-print">
        <button
          className="evolution-revert-button"
          onClick={() =>
            updateCustomConfig({
              pokemon: {
                [species.id]: { evolvesTo: undefined },
              },
            })
          }
        >
          <img src="/undo.png" />
        </button>
      </div>
    </div>
  )
}

Evolution.propTypes = {
  pokemonState: PropTypes.shape({
    species: PropTypes.shape({
      id: PropTypes.number.isRequired,
      varieties: PropTypes.object.isRequired,
    }).isRequired,
    selectedVariety: PropTypes.number.isRequired,
  }).isRequired,
}

export default Evolution
