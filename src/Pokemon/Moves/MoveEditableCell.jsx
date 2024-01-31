import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const MoveEditableCell = ({ selectedMove, moveAttribute }) => {
  const [customConfig, updateCustomConfig] = useCustomConfig()
  return (
    <AutoHeightTextArea
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
}

export default MoveEditableCell
