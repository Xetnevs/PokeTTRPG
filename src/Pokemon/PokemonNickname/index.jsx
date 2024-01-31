import 'src/Pokemon/PokemonNickname/nickname.css'

import PropTypes from 'prop-types'

const PokemonNickname = ({
  pokemonState: { nickname = '' },
  onPokemonStateChange,
}) => (
  <>
    <div className="label-input-pair">
      <span className="nickname-label">Nickname:</span>
      <input
        className="nickname-input"
        value={nickname}
        onChange={e => onPokemonStateChange({ nickname: e.target.value })}
      />
    </div>
  </>
)

PokemonNickname.propTypes = {
  pokemonState: PropTypes.shape({
    nickname: PropTypes.string,
  }).isRequired,
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default PokemonNickname
