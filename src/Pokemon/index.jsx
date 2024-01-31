import 'src/Pokemon/pokemon.css'

import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import Ability from 'src/Pokemon/Attributes/Ability'
import Evolution from 'src/Pokemon/Attributes/Evolution'
import Sprite from 'src/Pokemon/Attributes/Sprite'
import Stats from 'src/Pokemon/Attributes/Stats'
import Type from 'src/Pokemon/Attributes/Type'
import Moves from 'src/Pokemon/Moves/MovesTable.jsx'
import Notes from 'src/Pokemon/Notes'
import PokemonNickname from 'src/Pokemon/PokemonNickname'
import PokemonSelector from 'src/Pokemon/PokemonSelector'
import RemovePokemonButton from 'src/Pokemon/RemovePokemonButton'
import SaveStateButton from 'src/Pokemon/SaveStateButton'
import TrainerName from 'src/Pokemon/TrainerName'
import UploadStateButton from 'src/Pokemon/UploadStateButton'

const Pokemon = ({ pokemonState, setPokemonState }) => {
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
        <UploadStateButton onPokemonStateChange={setPokemonState} />
        <RemovePokemonButton onPokemonStateChange={setPokemonState} />
      </div>
    </div>
  )
}

Pokemon.propTypes = {
  pokemonState: PropTypes.object.isRequired,
  setPokemonState: PropTypes.func.isRequired,
}

export default Pokemon
