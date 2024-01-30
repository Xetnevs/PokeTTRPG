import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { sanitizeString } from 'src/utils.js'
import { compact } from 'lodash'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import 'src/Pokemon/Moves/moves.css'

const checkIsStab = (moveType, pokemon) =>
  pokemon.types.find(type => type === moveType)

const getEffectString = ({
  move_effect_chance,
  move_effect: { effect_description },
}) =>
  effect_description
    .map(({ short_effect, effect }) =>
      (effect || short_effect).replace('$effect_chance', move_effect_chance)
    )
    .join(', ')

const MoveSelector = ({
  selectedMove,
  pokemonState: { species, selectedVariety },
  onPokemonStateChange,
}) => {
  const [movesList, setMovesList] = useState([])
  const [selection, setSelection] = useState([])
  const Pokedex = usePokedex()

  useEffect(() => {
    const movesList = compact(
      species.varieties[selectedVariety].moves.map(
        move => Pokedex.pokemonData.moves[move.move_id]
      )
    )
    setMovesList(movesList)
    setSelection(selectedMove ? [selectedMove] : [])
  }, [species, selectedMove])

  return (
    <Typeahead
      className="move-input"
      labelKey="name"
      id="MoveSelector"
      clearButton
      onChange={move => {
        setSelection(move)
        onPokemonStateChange(move)
      }}
      options={movesList || []}
      placeholder="Show me your moves"
      selected={selection || []}
    />
  )
}

const MoveEditableCell = ({ selectedMove, moveAttribute }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  return (
    <AutoHeightTextArea
      className={`move-${moveAttribute}-text`}
      value={
        customConfig.moves?.[selectedMove.id]?.[moveAttribute] ||
        selectedMove[moveAttribute] ||
        ''
      }
      onChange={e => {
        updateCustomConfig({
          moves: {
            [selectedMove.id]: {
              [moveAttribute]: e.target.value,
            },
          },
        })
      }}
    />
  )
}

const MovesRow = ({ pokemonState, selectedMove, onPokemonStateChange }) => {
  const Pokedex = usePokedex()
  const [customConfig, updateCustomConfig] = useCustomConfig()

  const statPoints = selectedMove
    ? selectedMove.damage_class.name.toUpperCase() === 'SPECIAL'
      ? pokemonState.stats['special-attack']
      : pokemonState.stats.attack
    : 0
  const isStab = selectedMove
    ? checkIsStab(
        selectedMove.type.name,
        pokemonState.species.varieties[pokemonState.selectedVariety]
      )
    : false
  const totalPower = selectedMove
    ? Math.floor((selectedMove.power + statPoints) * (isStab ? 1.5 : 1))
    : 0

  //resets the selected move if the selected species changes
  useEffect(() => onPokemonStateChange(), [pokemonState.species])

  return (
    <tr>
      <td>
        <MoveSelector
          pokemonState={pokemonState}
          onPokemonStateChange={onPokemonStateChange}
          selectedMove={selectedMove}
        />
      </td>
      {selectedMove ? (
        <>
          <td>
            <img
              className="type-icon"
              src={`/src/assets/types/${selectedMove.type.name}.png`}
              key={selectedMove.type.name}
            />
          </td>
          <td>{sanitizeString(selectedMove.damage_class.name)}</td>
          <td>
            <MoveEditableCell
              selectedMove={selectedMove}
              moveAttribute="range"
            />
          </td>
          <td>
            <MoveEditableCell
              selectedMove={selectedMove}
              moveAttribute="accuracy"
            />
          </td>
          {selectedMove.damage_class.name !== 'status' && (
            <>
              <td>
                <MoveEditableCell
                  selectedMove={selectedMove}
                  moveAttribute="power"
                />
              </td>
              <td>{statPoints}</td>
              <td>{isStab ? '✅' : '❌'}</td>
              <td>{totalPower}</td>
            </>
          )}
          <td colSpan={selectedMove.damage_class.name === 'status' ? 5 : 1}>
            <MoveEditableCell
              selectedMove={selectedMove}
              moveAttribute="moveDescription"
            />
          </td>
          <td>
            <MoveEditableCell selectedMove={selectedMove} moveAttribute="pp" />
          </td>
          <td>
            <button
              className="moves-revert-button"
              onClick={() =>
                updateCustomConfig({
                  moves: {
                    [selectedMove.id]: undefined,
                  },
                })
              }
            >
              <img src="src/Assets/undo.png" />
            </button>
          </td>
        </>
      ) : (
        <>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </>
      )}
    </tr>
  )
}

const MovesTable = ({ pokemonState, onPokemonStateChange }) => {
  const wrappedOnStateChange = index => state => {
    const selectedMoves = [...(pokemonState.selectedMoves || [])]

    if (state && state.length) {
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
            <th></th>
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

export default MovesTable
