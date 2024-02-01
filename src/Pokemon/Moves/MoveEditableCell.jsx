import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const InputWrapper = ({children, ...props}) => (<input {...props} type="number" step="1">{children}</input>)

const MoveEditableCell = ({ selectedMove, moveAttribute, type="text" }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  const Component = type === 'number' ? InputWrapper : AutoHeightTextArea
  return (
    <Component
      className={`move-${moveAttribute}-text`}
      value={
        customConfig.moves?.[selectedMove.id]?.[moveAttribute] ||
        selectedMove[moveAttribute] ||
        ''
      }
      onChange={e => {
        updateCustomConfig({
          moves: {
            [selectedMove.id]: {
              [moveAttribute]: e.target.value,
            },
          },
        })
      }}
    />
  )
}

MoveEditableCell.propTypes = {
  selectedMove: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  moveAttribute: PropTypes.string.isRequired,
  type: PropTypes.string
}

export default MoveEditableCell
