import 'src/Views/MachineView/machineView.css'

import PropTypes from 'prop-types'
import Machines from 'src/Machines'

const MachineView = ({ machineState, setMachineState }) => {
  return (
    <div className="machine-view">
      <Machines
        machineState={machineState}
        onMachineStateChange={setMachineState}
      />
    </div>
  )
}

MachineView.propTypes = {
  machineState: PropTypes.object.isRequired,
  setMachineState: PropTypes.func.isRequired,
}

export default MachineView
