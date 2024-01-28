import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useCustomConfig } from 'src/CustomConfigContext.jsx'
import ReactFileReader from 'react-file-reader'
import exportFromJSON from 'export-from-json'

const SaveUploadStateButton = ({ pokemonState, onPokemonStateChange }) => {
  const [customConfig, setCustomConfig] = useCustomConfig()
  return (
    <div className="save-upload-container">
      {!isEmpty(pokemonState) && (
        <button
          className="save-button"
          onClick={() =>
            exportFromJSON({
              data: { pokemonState, customConfig },
              fileName: 'poke',
              exportType: exportFromJSON.types.json,
            })
          }
        >
          <img src="src/Assets/save.svg" />
        </button>
      )}
      <ReactFileReader
        fileTypes={['.json']}
        handleFiles={file => {
          if (file.length > 0) {
            file[0]
              .text()
              .then(JSON.parse)
              .then(res => {
                onPokemonStateChange(res.pokemonState)
                setCustomConfig(res.customConfig)
              })
          }
        }}
      >
        <button className="read-button">
          <img src="src/Assets/upload.svg" />
        </button>
      </ReactFileReader>
    </div>
  )
}

export default SaveUploadStateButton
