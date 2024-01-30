import { useState, useEffect } from 'react'
import { merge } from 'lodash'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import ReactFileReader from 'react-file-reader'
import 'src/Pokemon/UploadStateButton/uploadButton.css'

const SaveUploadStateButton = ({ pokemonState, onPokemonStateChange }) => {
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
        <img src="src/Assets/upload.svg" />
      </button>
    </ReactFileReader>
  )
}

export default SaveUploadStateButton
