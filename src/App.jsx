import 'src/App.css'

import { map } from 'lodash'
import { useEffect, useState } from 'react'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import { usePokedex } from 'src/Contexts/PokedexContext'
import LoadingSpinner from 'src/LoadingSpinner'
import Pokemon from 'src/Pokemon'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const { isLoading: isPokedexLoading } = usePokedex()
  const [{ isLoading: isCustomConfigLoading }, _] = useCustomConfig()
  const [isLoading, setIsLoading] = useState(
    isPokedexLoading || isCustomConfigLoading
  )
  const [isCaught, setIsCaught] = useState(false)
  const [partyPokemon, setPartyPokemon] = useState({ [uuidv4()]: {} })

  useEffect(() => {
    if (!isPokedexLoading && !isCustomConfigLoading) {
      setIsCaught(true)
      const timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 2000)

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId)
    }
  }, [isPokedexLoading, isCustomConfigLoading])

  const setPartyPokemonData = id => data =>
    setPartyPokemon({ ...partyPokemon, [id]: data })

  return (
    <>
      {!isLoading ? (
        <>
          {map(
            partyPokemon,
            (poke, id) =>
              poke && (
                <Pokemon
                  key={id}
                  pokemonState={poke}
                  setPokemonState={setPartyPokemonData(id)}
                />
              )
          )}

          <div className="party-increase-button-container">
            <button
              className="party-increase-button"
              onClick={() =>
                setPartyPokemon({ ...partyPokemon, [uuidv4()]: {} })
              }
            >
              <img src="src/Assets/plus.svg" />
            </button>
          </div>
        </>
      ) : (
        <LoadingSpinner isCaught={isCaught} />
      )}
    </>
  )
}

export default App
