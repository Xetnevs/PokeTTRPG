import { sanitizeString } from 'src/utils.js'
import 'src/Pokemon/TrainerName/trainerName.css'

const TrainerName = ({
  pokemonState: { trainer = '', },
  onPokemonStateChange,
}) => (
  <>
    <div className="label-input-pair">
      <span className="trainer-label">OT:</span>
      <input
        className="trainer-input"
        value={trainer}
        onChange={e => onPokemonStateChange({ trainer: e.target.value, })}
      />
    </div>
  </>
)

export default TrainerName
