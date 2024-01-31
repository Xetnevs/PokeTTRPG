import 'src/SaveAllStateButton/saveAll.css'

import exportFromJSON from 'export-from-json'
import { filter } from 'lodash'
import PropTypes from 'prop-types'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const SaveAllStateButton = ({ partyPokemon }) => {
  const [customConfig, _] = useCustomConfig()
  return (
    <button
      className="save-all-button"
      onClick={() =>
        exportFromJSON({
          data: {
            partyPokemon: filter(partyPokemon, val => !!val),
            customConfig: customConfig,
          },
          fileName: 'poke-all',
          exportType: exportFromJSON.types.json,
        })
      }
    >
      Save All
    </button>
  )
}

SaveAllStateButton.propTypes = {
  partyPokemon: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default SaveAllStateButton
