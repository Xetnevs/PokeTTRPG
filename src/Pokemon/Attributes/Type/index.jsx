import { useState, useEffect, useContext } from 'react'
import { sanitizeString } from 'src/utils.js'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { map, some } from 'lodash'
import 'src/Pokemon/Attributes/Type/type.css'
import TypeWeaknessIcon from 'src/Pokemon/Attributes/Type/TypeWeaknessIcon.jsx'

const mergeTypeChart = (chart1, chart2) => {
  let merged = { ...chart1, }
  for (const [key, value,] of Object.entries(chart2)) {
    merged = {
      ...merged,
      [key]: value * (merged[key] || 1),
    }
  }
  return merged
}

const hasTypeResistance = typeDetails =>
  some(typeDetails, (value, key) => value < 1)
const hasTypeWeakness = typeDetails =>
  some(typeDetails, (value, key) => value > 1)
const hasTypeImmunity = typeDetails =>
  some(typeDetails, (value, key) => value === 0)

const getTypeMatchups = (typeDetails, pokemon) =>
  pokemon.types.reduce(
    (acc, type) => mergeTypeChart(typeDetails[type], acc),
    {}
  )

const PokemonType = ({ pokemonState: { species, selectedVariety, }, }) => {
  const Pokedex = usePokedex()
  const typeDetails = getTypeMatchups(
    Pokedex.pokemonData.types,
    species.varieties[selectedVariety]
  )

  return (
    <div className="type-container">
      <div className="type-info">
        <h5>Type</h5>
        <div className="type-icons-list">
          {species.varieties[selectedVariety].types.map(type => (
            <img
              className="type-icon"
              src={`/src/assets/types/${type}.png`}
              key={type}
            />
          ))}
        </div>
      </div>
      {hasTypeResistance(typeDetails) && (
        <div className="type-info">
          <h5>Type Resistance</h5>
          <div className="type-icons-list">
            {map(typeDetails, (multiplier, type) => {
              if (multiplier < 1) {
                return (
                  <TypeWeaknessIcon
                    key={type}
                    type={type}
                    multiplier={multiplier}
                  />
                )
              }
            })}
          </div>
        </div>
      )}
      {hasTypeWeakness(typeDetails) && (
        <div className="type-info">
          <h5>Type Weakness</h5>
          <div className="type-icons-list">
            {map(typeDetails, (multiplier, type) => {
              if (multiplier > 1) {
                return (
                  <TypeWeaknessIcon
                    key={type}
                    type={type}
                    multiplier={multiplier}
                  />
                )
              }
            })}
          </div>
        </div>
      )}
      {hasTypeImmunity(typeDetails) && (
        <div className="type-info">
          <h5>Type Immunity</h5>
          <div className="type-icons-list">
            {map(typeDetails, (multiplier, type) => {
              if (multiplier === 0) {
                return (
                  <TypeWeaknessIcon
                    key={type}
                    type={type}
                    multiplier={multiplier}
                  />
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default PokemonType
