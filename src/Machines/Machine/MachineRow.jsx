import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import MachineEditableCell from 'src/Machines/Machine/MachineEditableCell.jsx'
import MachineSelector from 'src/Machines/Machine/MachineSelector.jsx'
import { sanitizeString } from 'src/utils.js'

const MachineRow = ({ machine, onMachineStateChange }) => {
  const [_, updateCustomConfig] = useCustomConfig()

  return (
    <tr>
      <td>
        <MachineSelector
          machine={machine}
          onMachineStateChange={onMachineStateChange}
        />
      </td>
      {!isEmpty(machine) ? (
        <>
          <td>
            <img
              className="type-icon"
              src={`/src/assets/types/${machine.type.name}.png`}
              key={machine.type.name}
            />
          </td>
          <td>{sanitizeString(machine.damage_class.name)}</td>
          <td>
            <MachineEditableCell machine={machine} moveAttribute="range" />
          </td>
          <td>
            <MachineEditableCell machine={machine} moveAttribute="accuracy" />
          </td>
          {machine.damage_class.name !== 'status' && (
            <>
              <td>
                <MachineEditableCell machine={machine} moveAttribute="power" />
              </td>
            </>
          )}
          <td colSpan={machine.damage_class.name === 'status' ? 5 : 1}>
            <MachineEditableCell
              machine={machine}
              moveAttribute="moveDescription"
            />
          </td>
          <td>
            <MachineEditableCell machine={machine} moveAttribute="pp" />
          </td>
          <td className="hide-on-print">
            <button
              className="machine-revert-button"
              onClick={() =>
                updateCustomConfig({
                  moves: {
                    [machine.id]: undefined,
                  },
                })
              }
            >
              <img src="src/assets/undo.png" />
            </button>
          </td>
          <td className="hide-on-print">
            <button
              className="remove-machine-button"
              onClick={() => onMachineStateChange(undefined)}
            >
              <img src="src/assets/trash.svg" />
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
          <td className="hide-on-print"/>
          <td className="hide-on-print"/>
        </>
      )}
    </tr>
  )
}

MachineRow.propTypes = {
  machine: PropTypes.shape({
    id: PropTypes.number,
    power: PropTypes.number,
    damage_class: PropTypes.shape({
      name: PropTypes.string,
    }),
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
    learnMethod: PropTypes.string,
    level: PropTypes.number,
  }),
  onMachineStateChange: PropTypes.func.isRequired,
}

export default MachineRow
