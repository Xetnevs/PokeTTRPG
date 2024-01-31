import 'src/Views/PokemonView/pokeView.css'

import { map } from 'lodash'
import PropTypes from 'prop-types'
import AddPartyPokemonButton from 'src/AddPartyPokemonButton'
import Pokemon from 'src/Pokemon'
import { v4 as uuidv4 } from 'uuid'

const PokemonView = ({ partyPokemon, setPartyPokemon }) => {
  const setPartyPokemonData = id => data =>
    setPartyPokemon({ ...partyPokemon, [id]: data })

  return (
    <div className="pokemon-view">
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
        <AddPartyPokemonButton
          onClick={() => setPartyPokemon({ ...partyPokemon, [uuidv4()]: {} })}
        />
      </div>
    </div>
  )
}

PokemonView.propTypes = {
  partyPokemon: PropTypes.object.isRequired,
  setPartyPokemon: PropTypes.func.isRequired,
}

export default PokemonView
