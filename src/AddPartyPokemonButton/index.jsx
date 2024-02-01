import 'src/AddPartyPokemonButton/party.css'

import PropTypes from 'prop-types'

const AddPartyPokemonButton = ({ onClick }) => (
  <>
      <button className="party-increase-button" onClick={onClick}>
        <div className="drop-shadow">
          <img src="src/assets/poke-plus.png" />
        </div>
      </button>
  </>
)

AddPartyPokemonButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default AddPartyPokemonButton
