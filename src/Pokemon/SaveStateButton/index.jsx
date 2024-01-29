import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import exportFromJSON from 'export-from-json'
import 'src/Pokemon/SaveStateButton/saveButton.css'

//TODO: Find save only the custom config of the selected ability

const SaveStateButton = ({ pokemonState }) => {
  const [customConfig, setCustomConfig] = useCustomConfig()
  return (
    <>
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
    </>
  )
}

export default SaveStateButton
