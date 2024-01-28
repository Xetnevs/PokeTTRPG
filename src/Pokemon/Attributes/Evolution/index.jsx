import { useState, useEffect, useContext } from 'react'
import { usePokedex } from 'src/PokedexContext.jsx'
import getEvolutionInfo from 'src/Pokemon/Attributes/Evolution/getEvolutionInfo'
import parseEvolution from 'src/Pokemon/Attributes/Evolution/parseEvolutions'
import 'src/Pokemon/Attributes/Evolution/evolution.css'

//Special cases: Slowpoke, Nosepass, Feebas, Kubfu, Stantler, Qwilfish,

const Evolution = ({ pokemon, pokemonState: { selectedVariety } }) => {
  const [evolvesTo, setEvolvesTo] = useState([])
  const Pokedex = usePokedex()

  useEffect(() => {
    setEvolvesTo(
      getEvolutionInfo(
        pokemon,
        pokemon.varieties[selectedVariety],
        Pokedex.pokemonData
      )
    )
    // parseEvolution(Pokedex, pokemon, pokemonState)
    // Pokedex.resource(pokemon.species.url)
    //   .then(species => Pokedex.resource(species.evolution_chain.url))
    //   .then(chain =>
    //     setEvolvesTo(getEvolutionInfo(pokemon.species.name, chain))
    //   )
  }, [pokemon, selectedVariety])

  return (
    <div className="evolution-container">
      {evolvesTo.map((text, index) => (
        <p className="evolution-text" key={index}>
          {text}
        </p>
      ))}
    </div>
  )
}

export default Evolution
