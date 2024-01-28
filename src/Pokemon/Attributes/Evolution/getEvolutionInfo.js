import { sanitizeString } from 'src/utils.js'
import { isEmpty, map, find } from 'lodash'

const findEvolutionForName = (chain, targetName, previousSpecies = {}) => {
  if (chain.species.name === targetName) {
    return { ...chain, previousSpecies }
  }

  if (chain.evolves_to) {
    for (const evolution of chain.evolves_to) {
      const result = findEvolutionForName(evolution, targetName, chain.species)
      if (result) {
        return result
      }
    }
  }
}

const getEvolutionTriggerText = details => {
  switch (details.evolution_trigger.name) {
    case 'level-up':
      return `when leveled up`
    case 'trade':
      if (details.trade_for_species) {
        return `by trading for a ${sanitizeString(details.trade_for_species.name)}`
      }
      return `by trading`
    case 'use-item':
      return `by using a ${sanitizeString(details.use_item.name)}`
    case 'shed':
      return `by shedding with a free spot in the party`
    case 'three-critical-hits':
      return `by landing three of them sweet as crits in a single encounter`
    case 'take-damage':
      return `after taking 49 points of damage without dying`
    case 'recoil-damage':
      return `after losing at least 294 points from recoil damage without dying`
    case 'spin':
      return `if the player spins while holding a sweet item`
    case 'other':
      return `by a sacrifice to the DM`
    default:
      return 'method not found'
  }
}

const getEvolutionConditionText = details => {
  const conditionText = []
  if (details.min_level) {
    conditionText.push(`to level ${details.min_level}`)
  }
  if (details.gender) {
    conditionText.push(`if gender is ${sanitizeString(details.gender.name)}`)
  }
  if (details.held_item) {
    conditionText.push(
      `while holding item ${sanitizeString(details.held_item.name)}`
    )
  }
  if (details.move) {
    conditionText.push(
      `while knowing the move ${sanitizeString(details.move.name)}`
    )
  }
  if (details.move_type) {
    conditionText.push(
      `while knowing a move of the ${details.move_type.name} type`
    )
  }
  if (details.min_happiness) {
    conditionText.push(`while happy`)
  }
  if (details.needs_overworld_rain) {
    conditionText.push(`while it is raining`)
  }
  if (details.pokemon_in_party) {
    conditionText.push(
      `while a ${sanitizeString(details.pokemon_in_party.name)} is in the party`
    )
  }
  if (details.type_in_party) {
    conditionText.push(
      `while a ${sanitizeString(details.type_in_party.name)} type is in the party`
    )
  }
  if (details.relative_physical_stats < 0) {
    conditionText.push(`while Defence stats are higher than Attack`)
  }
  if (details.relative_physical_stats > 0) {
    conditionText.push(`while Attack stats are higher than Defence`)
  }
  if (details.relative_physical_stats === 0) {
    conditionText.push(`while Attack stats are equal to Defence`)
  }
  if (details.time_of_day) {
    conditionText.push(`during ${details.time_of_day}`)
  }
  if (details.turn_upside_down) {
    conditionText.push(`while player sheet is upside down`)
  }
  return conditionText.join(', ')
}

const getEvolutionText = details =>
  `${getEvolutionTriggerText(details)} ${getEvolutionConditionText(details)}`

const getEvolutionInfo = (species, selectedVariety, pokemonData) => {
  let evolutionInfo = []
  if (species.evolves_from_species_id) {
    const previousSpecies = pokemonData.species[species.evolves_from_species_id]
    const previousVariety = find(
      previousSpecies.varieties,
      variety => variety.evolvesTo[selectedVariety.nameRaw]
    )
    if (previousVariety) {
      evolutionInfo = [
        ...evolutionInfo,
        `Evolves from ${sanitizeString(previousSpecies.name)}  ${getEvolutionText(previousVariety.evolvesTo[selectedVariety.nameRaw][0])}`,
      ]
    }
  }

  if (selectedVariety.evolvesTo) {
    evolutionInfo = [
      ...evolutionInfo,
      ...map(selectedVariety.evolvesTo, (evolution, name) => {
        const evolvesTo = sanitizeString(name)
        return evolvesTo
          ? `Evolves to ${evolvesTo} ${getEvolutionText(evolution[0])}`
          : 'Does not evolve'
      }),
    ]
  } else {
    evolutionInfo = [...evolutionInfo, 'Does not evolve']
  }
  return evolutionInfo
}

export default getEvolutionInfo
