import 'src/Views/MachineView/machineView.css'

import PropTypes from 'prop-types'
import AddMachineButton from 'src/AddMachineButton'
import Machines from 'src/Machines'
import { v4 as uuidv4 } from 'uuid'

const MachineView = ({ machineState, setMachineState }) => {
  return (
    <div className="machine-view">
      <Machines
        machineState={machineState}
        onMachineStateChange={setMachineState}
      />

      <div className="add-machine-button-container">
        <AddMachineButton
          onClick={() => setMachineState({ ...machineState, [uuidv4()]: {} })}
        />
      </div>
    </div>
  )
}

MachineView.propTypes = {
  machineState: PropTypes.object.isRequired,
  setMachineState: PropTypes.func.isRequired,
}

export default MachineView
