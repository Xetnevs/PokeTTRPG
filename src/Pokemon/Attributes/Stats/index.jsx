import { useState, useEffect } from 'react'
import 'src/Pokemon/Attributes/Stats/stats.css'

const getMovement = speed => {
  const base = 5

  if (speed >= 17) {
    return base + 4
  }

  if (speed >= 10) {
    return base + 3
  }

  if (speed >= 5) {
    return base + 2
  }

  if (speed >= 2) {
    return base + 1
  }

  return base
}

const getSize = ({ height }) => {
  if (height > 60) {
    return '3x3'
  } else if (height > 20) {
    return '2x2'
  }
  return '1x1'
}

const StatBlock = ({
  label,
  value,
  singleColumn,
  disabled,
  onChange,
  children,
  type = 'number',
}) => (
  <div
    className={`stat-group${singleColumn ? ' single-column' : ''}${children ? ' double-row' : ''}`}
  >
    <span className="stat-label">{label}:</span>
    <input
      className="stat-input"
      value={value}
      type={type}
      step="1"
      onChange={onChange}
      disabled={disabled}
    />
    {children && <span className="stat-info">{children}</span>}
  </div>
)

const PokemonStats = ({ pokemon, pokemonState, onPokemonStateChange }) => {
  const baseStats = pokemon.varieties[pokemonState.selectedVariety].base_stats

  const level = pokemonState.level || 1
  const statPointsToAllocate = pokemonState.statPointsToAllocate || 0
  const stats = pokemonState.stats || baseStats
  const size =
    pokemonState.size ||
    getSize(pokemon.varieties[pokemonState.selectedVariety])

  useEffect(() => {
    if (!pokemonState.stats) {
      onPokemonStateChange({ stats: baseStats })
    }
  }, [pokemon])

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
        const newStats = {
          ...stats,
          [stat]: valueInt,
        }

        onPokemonStateChange({
          stats: newStats,
          statPointsToAllocate: statPointsToAllocate + diff,
        })
      }
    }

  return (
    <div className="stat-container">
      <StatBlock label="Level" value={level} onChange={onLevelChange}>
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
    </div>
  )
}

export default PokemonStats
