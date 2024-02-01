import 'src/Pokemon/RemovePokemonButton/remove.css'

import PropTypes from 'prop-types'

const RemovePokemonButton = ({ onPokemonStateChange }) => (
  <button
    className="remove-button"
    onClick={() => onPokemonStateChange(undefined)}
  >
    <img src="/trash.svg" />
  </button>
)

RemovePokemonButton.propTypes = {
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default RemovePokemonButton
