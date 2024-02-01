import 'src/Pokemon/Moves/moves.css'

import PropTypes from 'prop-types'
import MovesRow from 'src/Pokemon/Moves/MovesRow.jsx'

const MovesTable = ({ pokemonState, onPokemonStateChange }) => {
  const wrappedOnStateChange = index => state => {
    const selectedMoves = [...(pokemonState.selectedMoves || [])]

    if (state?.length) {
      selectedMoves[index] = state[0]
    }
    onPokemonStateChange({ selectedMoves })
  }

  return (
    <div className="moves-container">
      <h5>Moves</h5>
      <table className="moves-table">
        <thead>
          <tr className="moves-table-header">
            <th>Name</th>
            <th>Learn</th>
            <th>Type</th>
            <th>Category</th>
            <th>Range</th>
            <th>Accuracy</th>
            <th>Base</th>
            <th>+ Score</th>
            <th>+ STAB</th>
            <th>= Total</th>
            <th>Move Bonus</th>
            <th>PP</th>
            <th className="hide-on-print"></th>
          </tr>
        </thead>
        <tbody>
          <MovesRow
            pokemonState={pokemonState}
            selectedMove={pokemonState.selectedMoves?.[0]}
            onPokemonStateChange={wrappedOnStateChange(0)}
          />
          <MovesRow
            pokemonState={pokemonState}
            selectedMove={pokemonState.selectedMoves?.[1]}
            onPokemonStateChange={wrappedOnStateChange(1)}
          />
          <MovesRow
            pokemonState={pokemonState}
            selectedMove={pokemonState.selectedMoves?.[2]}
            onPokemonStateChange={wrappedOnStateChange(2)}
          />
          <MovesRow
            pokemonState={pokemonState}
            selectedMove={pokemonState.selectedMoves?.[3]}
            onPokemonStateChange={wrappedOnStateChange(3)}
          />
        </tbody>
      </table>
    </div>
  )
}

MovesTable.propTypes = {
  pokemonState: PropTypes.shape({
    selectedMoves: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default MovesTable
