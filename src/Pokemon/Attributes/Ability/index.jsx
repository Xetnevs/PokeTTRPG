import React, { useState, useEffect, useContext } from 'react'
import { map } from 'lodash'
import { sanitizeString } from 'src/utils.js'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import 'src/Pokemon/Attributes/Ability/ability.css'

const PokemonAbility = ({
  pokemonState: { species, selectedAbility = 1, selectedVariety },
  onPokemonStateChange,
}) => {
  const abilities = species.varieties[selectedVariety].abilities
  const [abilityDescription, setAbilityDescription] = useState()
  const [customConfig, setCustomConfig] = useCustomConfig()
  const Pokedex = usePokedex()

  useEffect(() => {
    const selectedAbilityName = abilities[selectedAbility].name
    if (customConfig[selectedAbilityName]) {
      setAbilityDescription(customConfig[selectedAbilityName])
    } else {
      setAbilityDescription(
        Pokedex.pokemonData.abilities[abilities[selectedAbility].id]
          .effect_description
      )
    }
  }, [species, customConfig, selectedAbility])

  const onChange = ({ target: { value } }) =>
    onPokemonStateChange({ selectedAbility: value })

  return (
    <div className="ability-container">
      <h5>Ability</h5>
      <select
        className="ability-name"
        onChange={onChange}
        value={selectedAbility}
      >
        {map(abilities, ({ name, slot }) => (
          <option value={slot} key={slot}>
            {name}
          </option>
        ))}
      </select>
      <textarea
        className="ability-text"
        value={abilityDescription}
        onChange={e => {
          setCustomConfig({
            ...customConfig,
            [abilities[selectedAbility].name]: e.target.value,
          })
        }}
      />
      <div className="ability-button-container">
        <button
          className="ability-revert-button"
          onClick={() =>
            setCustomConfig({
              ...customConfig,
              [abilities[selectedAbility].name]: undefined,
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
