import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const MachineEditableCell = ({ machine, moveAttribute }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  return (
    <AutoHeightTextArea
      className={`machine-${moveAttribute}-text`}
      value={
        customConfig.moves?.[machine.id]?.[moveAttribute] ||
        machine[moveAttribute] ||
        ''
      }
      onChange={e => {
        updateCustomConfig({
          moves: {
            [machine.id]: {
              [moveAttribute]: e.target.value,
            },
          },
        })
      }}
    />
  )
}

MachineEditableCell.propTypes = {
  machine: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  moveAttribute: PropTypes.string.isRequired,
}

export default MachineEditableCell
