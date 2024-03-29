import 'src/Pokemon/Attributes/Type/type.css'

import { map, some } from 'lodash'
import PropTypes from 'prop-types'
import { usePokedex } from 'src/Contexts/PokedexContext'
import TypeWeaknessIcon from 'src/Pokemon/Attributes/Type/TypeWeaknessIcon.jsx'

const mergeTypeChart = (chart1, chart2) => {
  let merged = { ...chart1 }
  for (const [key, value] of Object.entries(chart2)) {
    merged = {
      ...merged,
      [key]: value * (merged[key] || 1),
    }
  }
  return merged
}

const hasTypeResistance = typeDetails => some(typeDetails, value => value < 1)
const hasTypeWeakness = typeDetails => some(typeDetails, value => value > 1)
const hasTypeImmunity = typeDetails => some(typeDetails, value => value === 0)

const getTypeMatchups = (typeDetails, pokemon) =>
  pokemon.types.reduce(
    (acc, type) => mergeTypeChart(typeDetails[type], acc),
    {}
  )

const PokemonType = ({ pokemonState: { species, selectedVariety } }) => {
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
              src={`/poke/assets/types/${type}.png`}
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

PokemonType.propTypes = {
  pokemonState: PropTypes.shape({
    selectedVariety: PropTypes.number.isRequired,
    species: PropTypes.shape({
      varieties: PropTypes.objectOf(
        PropTypes.shape({
          types: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default PokemonType
