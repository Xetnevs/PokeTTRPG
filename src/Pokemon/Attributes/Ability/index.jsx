import React, { useState, useEffect, useContext } from 'react'
import { map } from 'lodash'
import { sanitizeString } from 'src/utils.js'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import 'src/Pokemon/Attributes/Ability/ability.css'

const getAbilityText = (customConfig, selectedAbilityId, pokemonData) => {
  if (customConfig.abilities?.[selectedAbilityId]) {
    return customConfig.abilities?.[selectedAbilityId]
  } else {
    return pokemonData.abilities[selectedAbilityId].effect_description
  }
}

const PokemonAbility = ({
  pokemonState: { species, selectedAbility = 1, selectedVariety, },
  onPokemonStateChange,
}) => {
  const abilities = species.varieties[selectedVariety].abilities
  const selectedAbilityId = abilities[selectedAbility].id
  const [customConfig, updateCustomConfig,] = useCustomConfig()
  const Pokedex = usePokedex()

  const onChange = ({ target: { value, }, }) =>
    onPokemonStateChange({ selectedAbility: value, })

  return (
    <div className="ability-container">
      <h5>Ability</h5>
      <select
        className="ability-name"
        onChange={onChange}
        value={selectedAbility}
      >
        {map(abilities, ({ name, slot, }) => (
          <option value={slot} key={slot}>
            {name}
          </option>
        ))}
      </select>
      <AutoHeightTextArea
        className="ability-text"
        value={getAbilityText(
          customConfig,
          selectedAbilityId,
          Pokedex.pokemonData
        )}
        onChange={e => {
          updateCustomConfig({
            abilities: {
              [selectedAbilityId]: e.target.value,
            },
          })
        }}
      />
      <div className="ability-button-container">
        <button
          className="ability-revert-button"
          onClick={() =>
            updateCustomConfig({
              abilities: {
                [selectedAbilityId]: undefined,
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

export default PokemonAbility
