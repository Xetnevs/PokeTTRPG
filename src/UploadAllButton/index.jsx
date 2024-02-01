import 'src/UploadAllButton/uploadAll.css'

import PropTypes from 'prop-types'
import ReactFileReader from 'react-file-reader'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const UploadAllButton = ({ setPartyPokemon, setMachines }) => {
  const [_, updateCustomConfig] = useCustomConfig()
  return (
    <ReactFileReader
      fileTypes={['.json']}
      handleFiles={file => {
        if (file.length > 0) {
          file[0]
            .text()
            .then(JSON.parse)
            .then(res => {
              setPartyPokemon(res.partyPokemon)
              setMachines(res.machines)
              updateCustomConfig(res.customConfig)
            })
        }
      }}
    >
      <button className="upload-all-button">Upload All</button>
    </ReactFileReader>
  )
}

UploadAllButton.propTypes = {
  setPartyPokemon: PropTypes.func.isRequired,
  setMachines: PropTypes.func.isRequired,
}

export default UploadAllButton
