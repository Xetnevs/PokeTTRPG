import 'src/SaveAllStateButton/saveAll.css'

import exportFromJSON from 'export-from-json'
import { isEmpty, omitBy } from 'lodash'
import PropTypes from 'prop-types'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const SaveAllStateButton = ({ partyPokemon, machines }) => {
  const [customConfig, _] = useCustomConfig()
  return (
    <button
      className="save-all-button"
      onClick={() =>
        exportFromJSON({
          data: {
            partyPokemon: omitBy(partyPokemon, isEmpty),
            machines: omitBy(machines, isEmpty),
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
  machines: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default SaveAllStateButton
