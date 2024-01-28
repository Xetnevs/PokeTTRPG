import { useState, useEffect, useContext } from 'react'
import { sanitizeString } from 'src/utils.js'
import { usePokedex } from 'src/PokedexContext.jsx'
import { useCustomConfig } from 'src/CustomConfigContext.jsx'
import 'src/Pokemon/Attributes/Ability/ability.css'

const PokemonAbility = ({
  pokemon,
  pokemonState: { selectedAbility = 0, selectedVariety },
  onPokemonStateChange,
}) => {
  const abilities = pokemon.varieties[selectedVariety].abilities
  const [abilityDescription, setAbilityDescription] = useState()
  const [customConfig, setCustomConfig] = useCustomConfig()
  const Pokedex = usePokedex()

  const setAbilityDescriptionFromPokedex = abilityIndex => {
    const id = abilities[abilityIndex].id
    setAbilityDescription(
      Pokedex.pokemonData.abilities.find(ability => ability.id === id)
        .effect_description[0].short_effect
    )
  }
  // Pokedex.resource(pokemon.abilities[abilityIndex].ability.url).then(res =>
  //   setAbilityDescription(
  //     res.effect_entries.find(entry => entry.language.name === 'en')
  //       .short_effect
  //   )
  // )

  const updateAbilityDescription = abilityIndex => {
    if (customConfig[abilities[abilityIndex].name]) {
      setAbilityDescription(customConfig[abilities[abilityIndex].name])
    } else {
      setAbilityDescriptionFromPokedex(abilityIndex)
    }
  }

  useEffect(() => {
    updateAbilityDescription(selectedAbility)
  }, [pokemon, customConfig])

  const onChange = ({ target: { value } }) => {
    updateAbilityDescription(value)
    onPokemonStateChange({ selectedAbility: value })
  }

  return (
    <div className="ability-container">
      <h5>Ability</h5>
      <select
        className="ability-name"
        onChange={onChange}
        value={selectedAbility}
      >
        {abilities.map(({ name }, index) => (
          <option value={index} key={index}>
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
