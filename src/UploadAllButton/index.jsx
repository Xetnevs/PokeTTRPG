import 'src/UploadAllButton/uploadAll.css'

import PropTypes from 'prop-types'
import ReactFileReader from 'react-file-reader'
import { isEmpty } from 'lodash'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import { v4 as uuidv4 } from 'uuid'

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
              if(!isEmpty(res.partyPokemon)) {

              setPartyPokemon(res.partyPokemon)
              } else if(!isEmpty(res.pokemonState)) {
                setPartyPokemon({[uuidv4()]: res.pokemonState})
              }
              if(!isEmpty(res.machines)) {
              setMachines(res.machines)
            }
            if(!isEmpty(res.customConfig)) {
              updateCustomConfig(res.customConfig)
            }
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
