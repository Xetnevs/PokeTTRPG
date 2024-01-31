import 'src/Pokemon/Notes/notes.css'

import PropTypes from 'prop-types'
import AutoHeightTextArea from 'src/AutoHeightTextArea'

const Notes = ({ pokemonState: { notes }, onPokemonStateChange }) => (
  <div className="notes-container">
    <h5>Notes:</h5>
    <AutoHeightTextArea
      className="notes"
      value={notes}
      onChange={e => onPokemonStateChange({ notes: e.target.value })}
    />
  </div>
)

Notes.propTypes = {
  pokemonState: PropTypes.shape({
    notes: PropTypes.string,
  }).isRequired,
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default Notes
