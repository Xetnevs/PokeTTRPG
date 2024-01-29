import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { sanitizeString } from 'src/utils.js'
import { compact } from 'lodash'
import 'src/Pokemon/Moves/moves.css'

const checkIsStab = (moveType, pokemon) =>
  pokemon.types.find(type => type === moveType)

const getEffectString = ({
  move_effect_chance,
  move_effect: { effect_description },
}) =>
  effect_description
    .map(({ short_effect }) =>
      short_effect.replace('$effect_chance', move_effect_chance)
    )
    .join(', ')

const MoveSelector = ({
  onMoveSelected,
  pokemonState: { species, selectedVariety },
}) => {
  const [movesList, setMovesList] = useState([])
  const [selection, setSelection] = useState()
  const Pokedex = usePokedex()

  useEffect(() => {
    const movesList = compact(
      species.varieties[selectedVariety].moves.map(move => {
        const foundMove = Pokedex.pokemonData.moves[move.move_id - 1]
        return {
          ...foundMove,
          name: sanitizeString(foundMove.name),
        }
      })
    )
    setMovesList(movesList)
    setSelection()
  }, [species])

  return (
    <Typeahead
      className="move-input"
      labelKey="name"
      id="MoveSelector"
      clearButton
      onChange={move => {
        setSelection(move)
        onMoveSelected(move)
      }}
      options={movesList || []}
      placeholder="Show me your moves"
      selected={selection}
    />
  )
}

const MovesRow = ({ pokemonState }) => {
  const [moveData, setMoveData] = useState()
  const Pokedex = usePokedex()

  const onMoveSelected = selectedMove => {
    if (selectedMove.length > 0) {
      setMoveData(selectedMove[0])
    }
  }

  const basePower = moveData ? Math.floor(moveData.power / 10) : 0
  const statPoints = moveData
    ? moveData.damage_class.name.toUpperCase() === 'SPECIAL'
      ? pokemonState.stats['special-attack']
      : pokemonState.stats.attack
    : 0
  const isStab = moveData
    ? checkIsStab(
        moveData.type.name,
        pokemonState.species.varieties[pokemonState.selectedVariety]
      )
    : false
  const totalPower = Math.floor((basePower + statPoints) * (isStab ? 1.5 : 1))

  useEffect(() => setMoveData(), [pokemonState])

  return (
    <tr>
      <td>
        <MoveSelector
          pokemonState={pokemonState}
          onMoveSelected={onMoveSelected}
        />
      </td>
      {moveData ? (
        <>
          <td>
            <img
              className="type-icon"
              src={`/src/assets/types/${moveData.type.name}.png`}
              key={moveData.type.name}
            />
          </td>
          <td>{sanitizeString(moveData.damage_class.name)}</td>
          <td></td>
          <td>
            {moveData.accuracy}
            {moveData.accuracy && '%'}
          </td>
          {moveData.damage_class.name !== 'status' && (
            <>
              <td>{basePower}</td>
              <td>{statPoints}</td>
              <td>{isStab ? '✅' : '❌'}</td>
              <td>{totalPower}</td>{' '}
            </>
          )}
          <td colSpan={moveData.damage_class.name === 'status' ? 5 : 1}>
            {getEffectString(moveData)}
          </td>
          <td>{moveData.pp}</td>
        </>
      ) : (
        <>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </>
      )}
    </tr>
  )
}

const MovesTable = ({ pokemonState }) => {
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
          </tr>
        </thead>
        <tbody>
          <MovesRow pokemonState={pokemonState} />
          <MovesRow pokemonState={pokemonState} />
          <MovesRow pokemonState={pokemonState} />
          <MovesRow pokemonState={pokemonState} />
        </tbody>
      </table>
    </div>
  )
}

export default MovesTable
