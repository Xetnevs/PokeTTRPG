import { merge, map, reduce, isEmpty } from 'lodash'

import { Pokedex as PD } from 'pokeapi-js-wrapper'

const FORM_FLAGS = [
  'alola',
  'hisui',
  'galar',
  'paldea',
  'low-key',
  'dusk',
  'midnight',
  'strike',
  'wormadam',
  'segment',
  'family',
  'breed',
  'striped',
]

const INVALID_FORMS = ['gmax', 'cap', 'totem', 'galar-zen']

async function fetchPokemonSpeciesByName(name, Pokedex) {
  return await Pokedex.resource(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  )
}

async function fetchEvolutionChain(url, Pokedex) {
  const response = await Pokedex.resource(url)
  return response
}

function matchVariety(name) {
  if (name.split('-').length > 1) {
    return (
      FORM_FLAGS.some(flag => name.includes(flag)) &&
      !INVALID_FORMS.some(flag => name.includes(flag))
    )
  }
  return false
}

const processEvolutionChain2 = chain =>
  merge(
    {
      evolution: {
        [chain.species.name]: chain.evolves_to.map(evo => {
          const b = 'c'
          return evo.species.name
        }),
      },
      details: { [chain.species.name]: chain.evolution_details },
    },
    ...(chain.evolves_to || []).map(evo => processEvolutionChain2(evo))
  )

const convergeData2 = ({ evolution, details }, varieties) => {
  if (isEmpty(varieties)) {
    return reduce(
      evolution,
      (acc, value, key) => ({
        ...acc,
        [key]: value.reduce(
          (acc, val) => ({ ...acc, [val]: details[val] }),
          {}
        ),
      }),
      {}
    )
  }

  return reduce(
    evolution,
    (acc, value, key) => {
      const pokemonVarieties = varieties[key]
      const detailsMapped = value.flatMap(i => {
        const nValues = varieties[i] || [i]
        return nValues.map((j, n) => ({
          [j]: [
            (details[i] || [])[
              ((details[i] || []).length === 1 ? 0 : n) %
                (details[i] || []).length
            ],
          ],
        }))
      })
      let final = { ...acc }
      // const zipped = pokemonVarieties.slice().reverse().map((v, i) => {
      // 	const whateverthisis = detailsMapped.slice().reverse()[i]
      // 	console.log(v)
      // 	return {[v]: detailsMapped.slice().reverse()[i]}
      // });

      const zipped = detailsMapped
        .slice()
        .reverse()
        .map((v, i) => {
          const key = pokemonVarieties.slice().reverse()[
            i % pokemonVarieties.length
          ]
          return { [key]: v }
        })

      for (const obj of zipped) {
        const [[key, value]] = Object.entries(obj)
        final[key] = { ...final[key], ...value }
      }
      return { ...acc, ...final }
    },
    {}
  )
}

const parseEvolutions = async () => {
  const evolutionChains = [
    { url: 'https://pokeapi.co/api/v2/evolution-chain/33/' },
    { url: 'https://pokeapi.co/api/v2/evolution-chain/22/' },
  ]

  const Pokedex = new PD()
  const evolutions = await Promise.all(
    evolutionChains.map(async ({ url }) => {
      const evolutionChain = await fetchEvolutionChain(url, Pokedex)
      const processedData = processEvolutionChain2(evolutionChain.chain)
      const varieties = await reduce(
        processedData.evolution,
        async (acc, _, name) => {
          const varieties = (await fetchPokemonSpeciesByName(name, Pokedex))
            .varieties
          const defaultPokemon = varieties.find(item => item.is_default)
          const defaultName = defaultPokemon ? defaultPokemon.pokemon.name : ''
          const formPokemon = varieties
            .filter(item => !item.is_default && matchVariety(item.pokemon.name))
            .map(item => item.pokemon.name)
          return {
            [defaultName]: [defaultName, ...formPokemon],
            ...(await acc),
          }
        },
        {}
      )
      console.log('original')
      console.log({
        processedData,
        varieties,
      })
      return convergeData2(processedData, varieties)
    })
  )
  console.log(evolutions)
  return evolutions
}

export default parseEvolutions
