import { merge, map, reduce, isEmpty, find, keys } from 'lodash'

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

const getKey = key => {
  switch (key) {
    case 'basculin':
      return `${key}-red-striped`
    case 'basculegion':
    case 'basculegion-female':
      return 'basculegion-male'
    case 'pumpkaboo':
    case 'gourgeist':
      return `${key}-average`
    case 'wormadam':
      return `${key}-plant`
    case 'deoxys':
      return `${key}-normal`
    case 'tornadus':
    case 'thundurus':
    case 'landorus':
      return `${key}-incarnate`
    case 'keldeo':
      return `${key}-ordinary`
    case 'giratina':
      return 'giratina-altered'
    case 'shaymin':
      return 'shaymin-land'
    case 'darmanitan':
      return 'darmanitan-standard'
    case 'melotta':
      return 'melotta-aria'
    case 'meowstic':
      return 'meowstic-male'
    case 'aegislash':
      return 'aegislash-shield'
    case 'zygarde':
      return 'zygarde-50'
    case 'oricorio':
      return 'oricorio-baile'
    case 'lycanroc':
      return 'lycanroc-midday'
    case 'wishiwashi':
      return 'wishiwashi-solo'
    case 'minior':
      return 'minior-red-meteor'
    case 'mimikyu':
      return 'mimikyu-disguised'
    case 'toxtricity':
      return 'toxtricity-amped'
    case 'eiscue':
      return 'eiscue-ice'
    case 'indeedee':
      return 'indeedee-male'
    case 'morpeko':
      return 'morpeko-full-belly'
    case 'urshifu':
      return 'urshifu-single-strike'
    case 'enamorus':
      return 'enamorus-incarnate'
    default:
      return key
  }
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

const processEvolutionChain2 = chain => {
  return merge(
    {
      evolution: {
        [chain.name]: (chain.evolves_to || []).map(evo => {
          const b = 'c'
          return evo.name
        }),
      },
      details: { [chain.name]: chain.evolution_method },
    },
    ...(chain.evolves_to || []).map(evo => processEvolutionChain2(evo))
  )
}

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
      const pokemonVarieties = varieties[getKey(key)]
      if (!pokemonVarieties) {
        console.log(`${key} --- ${keys(varieties)}`)
        console.log('it be null')
      }
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

const parseEvolutions = (pokemon, allSpecies, currentVarietyName) => {
  const processedData = processEvolutionChain2(pokemon)
  const varieties = reduce(
    processedData.evolution,
    (acc, _, name) => {
      const varieties = find(
        allSpecies,
        species => species.name === name
      ).varieties
      const defaultPokemon = varieties.find(poke => poke.is_default)
      const defaultName = defaultPokemon ? defaultPokemon.name : ''
      const formPokemon = varieties
        .filter(item => !item.is_default && matchVariety(item.name))
        .map(item => item.name)
      return {
        [defaultName]: [defaultName, ...formPokemon],
        ...acc,
      }
    },
    {}
  )

  return convergeData2(processedData, varieties)[currentVarietyName]
}

export default parseEvolutions
