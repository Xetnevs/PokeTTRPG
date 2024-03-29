import 'src/AddMachineButton/addMachine.css'

import PropTypes from 'prop-types'

const AddMachineButton = ({ onClick }) => {
  return (
    <>
      <div className="add-machine-button-container hide-on-print">
        <button className="add-machine-button" onClick={onClick}>
          <div className="drop-shadow">
            <img src="/poke/assets/machine-add.png" />
          </div>
        </button>
      </div>
    </>
  )
}
AddMachineButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default AddMachineButton
