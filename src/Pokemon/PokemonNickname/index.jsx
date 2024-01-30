import { sanitizeString } from 'src/utils.js'
import 'src/Pokemon/PokemonNickname/nickname.css'

const PokemonNickname = ({
  pokemonState: { nickname = '', },
  onPokemonStateChange,
}) => (
  <>
    <div className="label-input-pair">
      <span className="nickname-label">Nickname:</span>
      <input
        className="nickname-input"
        value={nickname}
        onChange={e => onPokemonStateChange({ nickname: e.target.value, })}
      />
    </div>
  </>
)

export default PokemonNickname
