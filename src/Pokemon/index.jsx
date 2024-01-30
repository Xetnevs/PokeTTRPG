import { useState, useEffect } from 'react'
import Sprite from 'src/Pokemon/Attributes/Sprite'
import Stats from 'src/Pokemon/Attributes/Stats'
import Type from 'src/Pokemon/Attributes/Type'
import Ability from 'src/Pokemon/Attributes/Ability'
import Evolution from 'src/Pokemon/Attributes/Evolution'
import Moves from 'src/Pokemon/Moves/MovesTable.jsx'
import PokemonSelector from 'src/Pokemon/PokemonSelector'
import PokemonNickname from 'src/Pokemon/PokemonNickname'
import TrainerName from 'src/Pokemon/TrainerName'
import SaveStateButton from 'src/Pokemon/SaveStateButton'
import UploadStateButton from 'src/Pokemon/UploadStateButton'
import Notes from 'src/Pokemon/Notes'
import LoadingSpinner from 'src/LoadingSpinner'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import { isEmpty, merge } from 'lodash'
import { sanitizeString } from 'src/utils.js'
import 'src/Pokemon/pokemon.css'

const Pokemon = () => {
  const [pokemonState, setPokemonState] = useState({})

  const onPokemonStateChange = newState =>
    setPokemonState({ ...pokemonState, ...newState })

  return (
    <div className="pokemon-card">
      <div className="names-container">
        <PokemonSelector
          pokemonState={pokemonState}
          onPokemonStateChange={setPokemonState}
        />
        {!isEmpty(pokemonState?.species) && (
          <>
            <PokemonNickname
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />
            <TrainerName
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />{' '}
          </>
        )}
      </div>
      {!isEmpty(pokemonState?.species) && (
        <>
          <Stats
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
          <div className="right-hand-block">
            <Evolution pokemonState={pokemonState} />
            <Ability
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />
            <Notes
              pokemonState={pokemonState}
              onPokemonStateChange={onPokemonStateChange}
            />
          </div>
          <Sprite
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
          <Type pokemonState={pokemonState} />

          <Moves
            pokemonState={pokemonState}
            onPokemonStateChange={onPokemonStateChange}
          />
        </>
      )}
      <div className="save-upload-container">
        <SaveStateButton
          pokemonState={pokemonState}
          onPokemonStateChange={setPokemonState}
        />
        <UploadStateButton
          pokemonState={pokemonState}
          onPokemonStateChange={setPokemonState}
        />
      </div>
    </div>
  )
}

export default Pokemon
