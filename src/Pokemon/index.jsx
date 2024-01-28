import { useState, useEffect } from 'react'
import Sprite from 'src/Pokemon/Attributes/Sprite'
import Stats from 'src/Pokemon/Attributes/Stats'
import Type from 'src/Pokemon/Attributes/Type'
import Ability from 'src/Pokemon/Attributes/Ability'
import Evolution from 'src/Pokemon/Attributes/Evolution'
import Moves from 'src/Pokemon/Moves/MovesTable.jsx'
import PokemonSelector from 'src/Pokemon/PokemonSelector.jsx'
import PokemonNameTrainerInfo from 'src/Pokemon/PokemonNameTrainerInfo.jsx'
import Notes from 'src/Pokemon/Notes'
import SaveUploadStateButton from 'src/Pokemon/SaveUploadStateButton.jsx'
import LoadingSpinner from 'src/LoadingSpinner'
import { isEmpty } from 'lodash'
import { sanitizeString } from 'src/utils.js'
import 'src/Pokemon/pokemon.css'

const Pokemon = () => {
  const [nickname, setNickname] = useState()
  const [trainer, setTrainer] = useState('')
  const [pokemonData, setPokemonData] = useState({})
  const [pokemonState, setPokemonState] = useState({})
  useEffect(() => setNickname(sanitizeString(pokemonData.name)), [pokemonData])

  const onPokemonStateChange = newState =>
    setPokemonState({ ...pokemonState, ...newState })

  return (
    <div className="pokemon-card">
      <div className="name-container">
        <PokemonSelector
          setPokemonData={setPokemonData}
          pokemonState={pokemonState}
          onPokemonStateChange={onPokemonStateChange}
        />
        <PokemonNameTrainerInfo
          pokemon={pokemonData}
          pokemonState={pokemonState}
          onPokemonStateChange={onPokemonStateChange}
        />
      </div>
      {!isEmpty(pokemonData) && (
        <>
          <Stats
            pokemon={pokemonData}
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
          <div className="right-hand-block">
            <Evolution pokemon={pokemonData} pokemonState={pokemonState} />
            <Ability
              pokemon={pokemonData}
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />
            <Notes
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />
          </div>
          <Sprite
            pokemon={pokemonData}
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
          <Type pokemon={pokemonData} pokemonState={pokemonState} />

          <Moves
            pokemon={pokemonData}
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
        </>
      )}

      <SaveUploadStateButton
        pokemonState={pokemonState}
        onPokemonStateChange={setPokemonState}
      />
    </div>
  )
}

/*
      {!isEmpty(pokemonData) && (
        <>
          <Stats
            pokemon={pokemonData}
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
          <div className="right-hand-block">
            <Evolution pokemon={pokemonData} />
            <Ability
              pokemon={pokemonData}
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />
            <Notes
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />
          </div>
          <Sprite
            pokemon={pokemonData}
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
          <Type pokemon={pokemonData} />

          <Moves pokemon={pokemonData} pokemonState={pokemonState} />
        </>
      )}
*/

export default Pokemon
