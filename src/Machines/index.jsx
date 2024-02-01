import 'src/Machines/machine.css'

import { map } from 'lodash'
import PropTypes from 'prop-types'
import MachineRow from 'src/Machines/Machine/MachineRow.jsx'

const Machines = ({ machineState, onMachineStateChange }) => {
  const wrappedOnStateChange = index => state =>
    onMachineStateChange({ ...machineState, [index]: state })

  return (
    <div className="machines-container">
      <h5>Moves</h5>
      <table className="machines-table">
        <thead>
          <tr className="machines-table-header">
            <th>Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Range</th>
            <th>Accuracy</th>
            <th>Base</th>
            <th>Move Bonus</th>
            <th>PP</th>
            <th className="hide-on-print"></th>
            <th className="hide-on-print"></th>
          </tr>
        </thead>
        <tbody>
          {map(
            machineState,
            (machine, id) =>
              machine && (
                <MachineRow
                  key={id}
                  machine={machine}
                  onMachineStateChange={wrappedOnStateChange(id)}
                />
              )
          )}
        </tbody>
      </table>
    </div>
  )
}

Machines.propTypes = {
  machineState: PropTypes.object.isRequired,
  onMachineStateChange: PropTypes.func.isRequired,
}

export default Machines
