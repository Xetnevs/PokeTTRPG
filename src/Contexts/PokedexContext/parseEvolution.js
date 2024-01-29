import {
  merge,
  map,
  reduce,
  isEmpty,
  find,
  keys,
  filter,
  findKey,
} from 'lodash'

// Original Python -> https://raw.githubusercontent.com/FallenDeity/PokeLance/master/examples/evolutions.py

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

const getVariety = (name, varieties) => {
  const variety = varieties[name]
  if (!variety) {
    // in the annoying cases where all default varieties are their name with a dash. Like wormadam or pumpkaboo or deoxys
    return find(varieties, (value, key) => key.startsWith(name))
  } else {
    return variety
  }
}

const matchVariety = name =>
  name.split('-').length > 1 &&
  FORM_FLAGS.some(flag => name.includes(flag)) &&
  !INVALID_FORMS.some(flag => name.includes(flag))

// This returns two objects, one is a list of all pokemon -> a list of who they evolve to,
// the other is an object of each pokemon varieties evolution details
const processEvolutionChain = chain =>
  merge(
    {
      evolutions: {
        [chain.name]: (chain.evolves_to || []).map(evo => evo.name),
      },
      evolution_details: { [chain.name]: chain.evolution_method },
    },
    ...(chain.evolves_to || []).map(evo => processEvolutionChain(evo))
  )

const convergeData = ({
  evolutions,
  evolution_details,
  varieties,
  selectedPokemon,
}) => {
  //The original function was written to handle a whole lot at once - we map these one at a time so
  //we can be certain that only one evolution exists
  const evolution = evolutions[selectedPokemon]

  if (!evolution) {
    return {} // no evolutions lets go
  }

  const pokemonVarieties = getVariety(selectedPokemon, varieties)

  if (
    evolution.length === 1 &&
    pokemonVarieties.length === 1 &&
    varieties[evolution[0]]?.length === 1
  ) {
    //easy case, one evolution one variety (doesn't hurt to go below anyway? do I need to shortcut?)
    //assume the last evolution in the list is correct except for goddamn feebas/milotic

    let foundDetails = evolution_details[evolution[0]].slice(-1)
    if (evolution[0] === 'milotic') {
      foundDetails = evolution_details[evolution[0]].slice(-2, -1)
    }

    return {
      [selectedPokemon]: {
        [evolution[0]]: foundDetails[0],
      },
    }
  }

  // the result of this is an object with each variety mapped to its evolution method
  // it does this by assuming the evolution details is in the order of the evolutions list
  const evolutionDetailsMapped = evolution.flatMap(evolutionName => {
    const variety = varieties[evolutionName] || [evolutionName]

    if (variety.length === 1) {
      //Handles the case where a pokemon has multiple evolutions, and some have updated over time.
      //Like the Eevee case where Glaceon and Leafeon had updated evolutions
      //so the last one in the list is assumed correct.
      return [
        {
          [variety[0]]: evolution_details[evolutionName]?.slice(-1)[0],
        },
      ]
    }

    //Thankfully there are no cases where there are more evolution details than varieties,
    //which means there hasn't been an update in an evolution where a poke has a form, for now
    // if(variety.length < evolution_details[evolutionName].length) {
    //   console.log('here')
    // }

    //else iterate the map and assume no pokemon with varieties had updated evolution methods....
    return variety.map((varietyName, varietyNumber) => ({
      [varietyName]: (evolution_details[evolutionName] || [])[
        ((evolution_details[evolutionName] || []).length === 1
          ? 0
          : varietyNumber) % (evolution_details[evolutionName] || []).length
      ],
    }))
  })

  if (selectedPokemon === 'eevee') {
    console.log('here')
  }

  //This maps the varieties to the mapped details above, assuming mapping variety[i] to evolutionDetail[i] making sure
  //to cycle around if there are less varieties than evolutions (for example, gloom -> [vileplume, bellossom]) or all
  //the blimmin' eevee's
  //This is reversed to handle the Mr. Mime case
  return evolutionDetailsMapped
    .slice()
    .reverse()
    .reduce((acc, detail, index) => {
      const variety = pokemonVarieties.slice().reverse()[
        index % pokemonVarieties.length
      ]
      return { ...acc, [variety]: { ...detail, ...(acc[variety] || []) } }
    }, {})
}

const parseEvolutions = (pokemon, allSpecies, currentVarietyName) => {
  const { evolutions, evolution_details } = processEvolutionChain(pokemon)
  const varieties = reduce(
    evolutions,
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

  const converged = convergeData({
    evolutions,
    evolution_details,
    varieties,
    selectedPokemon: pokemon.name,
  })
  return currentVarietyName ? converged[currentVarietyName] : converged
}

export default parseEvolutions
