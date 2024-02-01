import 'src/Pokemon/UploadStateButton/uploadButton.css'

import PropTypes from 'prop-types'
import ReactFileReader from 'react-file-reader'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'

const UploadStateButton = ({ onPokemonStateChange }) => {
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
              onPokemonStateChange(res.pokemonState)
              updateCustomConfig(res.customConfig)
            })
        }
      }}
    >
      <button className="upload-button">
        <img src="/upload.svg" />
      </button>
    </ReactFileReader>
  )
}

UploadStateButton.propTypes = {
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default UploadStateButton
