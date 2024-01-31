import 'src/Pokemon/TrainerName/trainerName.css'

import PropTypes from 'prop-types'

const TrainerName = ({
  pokemonState: { trainer = '' },
  onPokemonStateChange,
}) => (
  <>
    <div className="label-input-pair">
      <span className="trainer-label">OT:</span>
      <input
        className="trainer-input"
        value={trainer}
        onChange={e => onPokemonStateChange({ trainer: e.target.value })}
      />
    </div>
  </>
)

TrainerName.propTypes = {
  pokemonState: PropTypes.shape({
    trainer: PropTypes.string,
  }).isRequired,
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default TrainerName
