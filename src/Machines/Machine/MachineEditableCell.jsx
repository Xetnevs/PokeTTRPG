import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const InputWrapper = ({ children, ...props }) => (
  <input {...props} type="number" step="1">
    {children}
  </input>
)

const MachineEditableCell = ({ machine, moveAttribute, type = 'text' }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  const Component = type === 'number' ? InputWrapper : AutoHeightTextArea
  const value =
    customConfig.moves?.[machine.id]?.[moveAttribute] ||
    machine[moveAttribute] ||
    ''
  return (
    <>
      <Component
        className={`machine-${moveAttribute}-text hide-on-print`}
        value={value}
        onChange={e => {
          updateCustomConfig({
            ...customConfig,
            moves: {
              ...customConfig.moves,
              [machine.id]: {
                ...(customConfig?.moves?.[machine.id] || {}),
                [moveAttribute]: e.target.value,
              },
            },
          })
        }}
      />
      <span className={`move-${moveAttribute}-text show-on-print`}>
        {value}
      </span>
    </>
  )
}

MachineEditableCell.propTypes = {
  machine: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  moveAttribute: PropTypes.string.isRequired,
  type: PropTypes.string,
}

InputWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default MachineEditableCell
