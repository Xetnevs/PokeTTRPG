import parseEvolution from 'src/Contexts/PokedexContext/parseEvolution'
import { sanitizeString } from 'src/utils.js'

const BASE_STAT_DIVIDER = 20
const MOVE_POWER_DIVIDER = 10

const mapPokemonData = pokemonData => ({
  ...pokemonData,
  species: pokemonData.species.reduce(
    (acc, species) => ({
      ...acc,
      [species.id]: {
        ...species,
        name: sanitizeString(species.name),
        nameRaw: species.name,
        defaultVarietyId: species.varieties.find(poke => poke.is_default).id,
        varieties: species.varieties.reduce(
          (acc, variety) => ({
            ...acc,
            [variety.id]: {
              ...variety,
              name: sanitizeString(variety.name),
              nameRaw: variety.name,
              evolvesTo: parseEvolution(
                //this will effectively be the same call for each variety
                species,
                pokemonData.species,
                variety.name
              ),
              abilities: variety.abilities.reduce(
                (acc, { slot, ability }) => ({
                  ...acc,
                  [slot]: {
                    ...ability,
                    slot,
                    name: sanitizeString(ability.name),
                    nameRaw: ability.name,
                  },
                }),
                {}
              ),
              base_stats: variety.base_stats.reduce(
                (acc, { value, stat: { name } }) => ({
                  ...acc,
                  [name]: Math.floor(value / BASE_STAT_DIVIDER),
                }),
                {}
              ),
              sprites: variety.sprites[0].sprites,
              types: variety.types.map(({ type }) => type.name),
            },
          }),
          {}
        ),
      },
    }),
    {}
  ),
  types: pokemonData.types.reduce(
    (acc, type) => ({
      ...acc,
      [type.name]: pokemonData.types.reduce((acc, { name, efficacies }) => {
        const foundEfficancy =
          efficacies.find(eff => eff.type.name === type.name)?.damage_factor /
          100
        return foundEfficancy
          ? {
              ...acc,
              [name]: foundEfficancy,
            }
          : { ...acc }
      }, {}),
    }),
    {}
  ),
  abilities: pokemonData.abilities.reduce(
    (acc, ability) => ({
      ...acc,
      [ability.id]: {
        ...ability,
        name: sanitizeString(ability.name),
        nameRaw: ability.name,
        effect_description:
          ability.effect_description?.[0]?.short_effect ||
          ability.flavor_texts?.[0]?.flavor_text ||
          '',
      },
    }),
    {}
  ),
  moves: pokemonData.moves.reduce(
    (acc, move) => ({
      ...acc,
      [move.id]: {
        ...move,
        name: sanitizeString(move.name),
        nameRaw: move.name,
        accuracy: move.accuracy ? `${move.accuracy}%` : '',
        power: move.power ? Math.floor(move.power / MOVE_POWER_DIVIDER) : 0,
        moveDescription: getMoveDescription(
          move.move_effect,
          move.move_effect_chance
        ),
      },
    }),
    {}
  ),
})

const getMoveDescription = (move_effect, move_effect_chance) => {
  const effect = move_effect?.effect_description?.[0]?.effect || ''
  const short_effect = move_effect?.effect_description?.[0]?.short_effect || ''

  if (effect.length < short_effect.length) {
    return effect.replace('$effect_chance', move_effect_chance)
  }

  return short_effect.replace('$effect_chance', move_effect_chance)
}

export default mapPokemonData
