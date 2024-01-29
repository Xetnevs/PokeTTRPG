import { useState, useEffect, useContext } from 'react'
import { usePokedex } from 'src/Contexts/PokedexContext'
import getEvolutionInfo from 'src/Pokemon/Attributes/Evolution/getEvolutionInfo'
import 'src/Pokemon/Attributes/Evolution/evolution.css'

//Special cases: TODO: Nosepass (thunder stone), Feebas(2), Kubfu (fix mapping),

const Evolution = ({ pokemonState: { species, selectedVariety } }) => {
  const [evolvesTo, setEvolvesTo] = useState([])
  const Pokedex = usePokedex()

  useEffect(
    () =>
      setEvolvesTo(
        getEvolutionInfo(
          species,
          species.varieties[selectedVariety],
          Pokedex.pokemonData
        )
      ),
    [species, selectedVariety]
  )

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
