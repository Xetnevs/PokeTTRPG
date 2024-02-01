import 'src/Views/ViewToggleButton/toggle.css'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import PropTypes from 'prop-types'

const ViewToggleButton = ({ activeView, setActiveView }) => {
  return (
    <ToggleButtonGroup
      className="poke-toggle"
      value={activeView}
      exclusive
      onChange={(_, value) => setActiveView(value)}
    >
      <ToggleButton value="poke">
        <img className="poke-image" src="/poke.png" />
      </ToggleButton>
      <ToggleButton value="machine">
        <img className="machine-image" src="/machine.png" />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

ViewToggleButton.propTypes = {
  activeView: PropTypes.string.isRequired,
  setActiveView: PropTypes.func.isRequired,
}

export default ViewToggleButton
