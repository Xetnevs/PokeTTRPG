import { sanitizeString } from 'src/utils.js'
import { isEqual } from 'lodash'
import parseEvolution from 'src/Contexts/PokedexContext/parseEvolution'
// import parseEvolution2 from 'src/Contexts/PokedexContext/parseEvolution2'

// const getEvolution = (species, allSpecies, varietyName) => {
//   const data1 = parseEvolution(
//                 species,
//                 allSpecies,
//                 varietyName
//               )
//   const data2 = parseEvolution2(
//                 species,
//                 allSpecies,
//                 varietyName
//               )

//   if (!isEqual(data1, data2)) {
//     console.log('warning mismatch')
//     console.log(data1)
//     console.log(data2)
//     console.log('-----')
//   }

//   return data1
// }

const BASE_STAT_DIVIDER = 20

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
  abilities: pokemonData.abilities.reduce((acc, ability) => {
    return {
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
    }
  }, {}),
})

export default mapPokemonData
