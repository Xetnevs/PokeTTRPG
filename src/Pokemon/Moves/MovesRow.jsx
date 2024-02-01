import PropTypes from 'prop-types'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import MoveEditableCell from 'src/Pokemon/Moves/MoveEditableCell.jsx'
import MoveSelector from 'src/Pokemon/Moves/MoveSelector.jsx'
import { sanitizeString } from 'src/utils.js'

const checkIsStab = (moveType, pokemon) =>
  pokemon.types.find(type => type === moveType)

const MovesRow = ({ pokemonState, selectedMove, onPokemonStateChange }) => {
  const [_, updateCustomConfig] = useCustomConfig()

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
            {selectedMove.learnMethod === 'machine'
              ? 'TM/HM'
              : `At Level ${selectedMove.level}`}
          </td>
          <td>
            <img
              className="type-icon"
              src={`/types/${selectedMove.type.name}.png`}
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
          <td className="hide-on-print">
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
              <img src="/undo.png" />
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
          <td className="hide-on-print" />
        </>
      )}
    </tr>
  )
}

MovesRow.propTypes = {
  pokemonState: PropTypes.shape({
    stats: PropTypes.shape({
      attack: PropTypes.number,
      'special-attack': PropTypes.number,
    }).isRequired,
    species: PropTypes.object.isRequired,
    selectedVariety: PropTypes.number.isRequired,
  }).isRequired,
  selectedMove: PropTypes.shape({
    id: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    damage_class: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    learnMethod: PropTypes.string.isRequired,
    level: PropTypes.number,
  }),
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default MovesRow
