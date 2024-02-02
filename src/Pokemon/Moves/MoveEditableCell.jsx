import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const InputWrapper = ({ children, ...props }) => (
  <input {...props} type="number" step="1">
    {children}
  </input>
)

const MoveEditableCell = ({ selectedMove, moveAttribute, type = 'text' }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  const Component = type === 'number' ? InputWrapper : AutoHeightTextArea
  const value =
    customConfig.moves?.[selectedMove.id]?.[moveAttribute] ||
    selectedMove[moveAttribute] ||
    ''
  return (
    <>
      <Component
        className={`move-${moveAttribute}-text hide-on-print`}
        value={value}
        onChange={e => {
          updateCustomConfig({
            ...customConfig,
            moves: {
              ...customConfig.moves,
              [selectedMove.id]: {
                ...(customConfig?.moves?.[selectedMove.id] || {}),
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

MoveEditableCell.propTypes = {
  selectedMove: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  moveAttribute: PropTypes.string.isRequired,
  type: PropTypes.string,
}

InputWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default MoveEditableCell
