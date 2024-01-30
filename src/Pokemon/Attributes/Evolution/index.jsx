import { useState, useEffect, useContext, useRef } from 'react'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import getEvolutionInfo from 'src/Pokemon/Attributes/Evolution/getEvolutionInfo'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { merge } from 'lodash'
import 'src/Pokemon/Attributes/Evolution/evolution.css'

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

      <div className="evolution-button-container">
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
          <img src="src/Assets/undo.png" />
        </button>
      </div>
    </div>
  )
}

export default Evolution
