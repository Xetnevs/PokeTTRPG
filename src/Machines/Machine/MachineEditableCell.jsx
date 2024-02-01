import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const InputWrapper = ({children, ...props}) => (<input {...props} type="number" step="1">{children}</input>)

const MachineEditableCell = ({ machine, moveAttribute, type="text" }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  const Component = type === 'number' ? InputWrapper : AutoHeightTextArea

  return (
    <Component
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
  type: PropTypes.string
}

export default MachineEditableCell
