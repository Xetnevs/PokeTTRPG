import 'src/Pokemon/Attributes/Stats/stats.css'

import PropTypes from 'prop-types'
import StatBlock from 'src/Pokemon/Attributes/Stats/StatBlock'

const getMovement = speed => {
  let comparisonNumber = 2
  let output = 5

  while (speed >= comparisonNumber) {
    comparisonNumber += (output - 3) * 2 - 1
    output++
  }

  return output
}

const getSize = ({ height }) => {
  if (height > 60) {
    return '3x3'
  } else if (height > 20) {
    return '2x2'
  }
  return '1x1'
}

const PokemonStats = ({ pokemonState, onPokemonStateChange }) => {
  const baseStats =
    pokemonState.species.varieties[pokemonState.selectedVariety].base_stats
  const level = pokemonState.level || 1
  const statPointsToAllocate = pokemonState.statPointsToAllocate || 0
  const stats = pokemonState.stats || baseStats
  const size =
    pokemonState.size ||
    getSize(pokemonState.species.varieties[pokemonState.selectedVariety])

  const onLevelChange = ({ target: { value } }) => {
    const levelToSet = Math.max(1, value)

    const diff = levelToSet - level

    if (statPointsToAllocate + diff >= 0) {
      onPokemonStateChange({
        level: levelToSet,
        statPointsToAllocate: statPointsToAllocate + diff,
      })
    }
  }

  const onStatChange =
    stat =>
    ({ target: { value } }) => {
      const valueInt = parseInt(value)
      const diff = stats[stat] - valueInt

      if (statPointsToAllocate + diff >= 0 && valueInt >= baseStats[stat]) {
        onPokemonStateChange({
          stats: {
            ...stats,
            [stat]: valueInt,
          },
          statPointsToAllocate: statPointsToAllocate + diff,
        })
      }
    }

  return (
    <div className="stat-container">
      <StatBlock label="Level" value={level} onChange={onLevelChange} max={100}>
        {statPointsToAllocate} Points to Allocate
      </StatBlock>
      <StatBlock
        label="Speed"
        value={stats['speed']}
        onChange={onStatChange('speed')}
      >
        Movement: {getMovement(stats.speed)}sq
      </StatBlock>
      <StatBlock
        label="HP Base"
        value={stats.hp}
        onChange={onStatChange('hp')}
      />
      <StatBlock label="HP" value={(stats.hp + level) * 2} disabled />
      <StatBlock
        label="Attack"
        value={stats.attack}
        onChange={onStatChange('attack')}
      />
      <StatBlock
        label="Special"
        value={stats['special-attack']}
        onChange={onStatChange('special-attack')}
      />
      <StatBlock
        label="Defence"
        value={stats.defense}
        onChange={onStatChange('defense')}
      />
      <StatBlock
        label="Sp. Def"
        value={stats['special-defense']}
        onChange={onStatChange('special-defense')}
      />
      <StatBlock
        label="Size"
        value={size}
        type="text"
        onChange={e => onPokemonStateChange({ size: e.target.value })}
      />

      <div className="stats-button-container">
        <button
          className="stats-revert-button"
          onClick={() =>
            onPokemonStateChange({
              level: 1,
              statPointsToAllocate: 0,
              stats: baseStats,
              size: getSize(
                pokemonState.species.varieties[pokemonState.selectedVariety]
              ),
            })
          }
        >
          <img src="src/Assets/undo.png" />
        </button>
      </div>
    </div>
  )
}

const statsShape = PropTypes.shape({
  speed: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  'special-attack': PropTypes.number.isRequired,
  'special-defense': PropTypes.number.isRequired,
})

PokemonStats.propTypes = {
  pokemonState: PropTypes.shape({
    selectedVariety: PropTypes.number,
    level: PropTypes.number,
    statPointsToAllocate: PropTypes.number,
    size: PropTypes.string,
    stats: statsShape,
    species: PropTypes.shape({
      varieties: PropTypes.objectOf(
        PropTypes.shape({
          base_stats: statsShape,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default PokemonStats
