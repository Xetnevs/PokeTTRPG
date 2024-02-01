import 'src/App.css'

import { useEffect, useState } from 'react'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import { usePokedex } from 'src/Contexts/PokedexContext'
import LoadingSpinner from 'src/LoadingSpinner'
import SaveAllStateButton from 'src/SaveAllStateButton'
import UploadAllButton from 'src/UploadAllButton'
import MachineView from 'src/Views/MachineView'
import PokemonView from 'src/Views/PokemonView'
import ViewToggleButton from 'src/Views/ViewToggleButton'
import { v4 as uuidv4 } from 'uuid'

const PokeApp = () => {
  const { isLoading: isPokedexLoading } = usePokedex()
  const [{ isLoading: isCustomConfigLoading }, _] = useCustomConfig()
  const [isLoading, setIsLoading] = useState(
    isPokedexLoading || isCustomConfigLoading
  )
  const [isCaught, setIsCaught] = useState(false)
  const [partyPokemon, setPartyPokemon] = useState({ [uuidv4()]: {} })
  const [machines, setMachines] = useState({ [uuidv4()]: {} })
  const [activeView, setActiveView] = useState('poke')

  useEffect(() => {
    if (!isPokedexLoading && !isCustomConfigLoading) {
      setIsCaught(true)
      const timeoutId = setTimeout(() => {
        setIsLoading(false)
      }, 2000)

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId)
    }
  }, [isPokedexLoading, isCustomConfigLoading])

  return (
    <>
      {!isLoading ? (
        <>
          <div className="header">
            <ViewToggleButton
              activeView={activeView}
              setActiveView={setActiveView}
            />
          </div>
          {activeView === 'poke' ? (
            <PokemonView
              partyPokemon={partyPokemon}
              setPartyPokemon={setPartyPokemon}
            />
          ) : (
            <MachineView
              machineState={machines}
              setMachineState={setMachines}
            />
          )}
          <div className="footer">
            <SaveAllStateButton
              partyPokemon={partyPokemon}
              machines={machines}
            />
            <UploadAllButton
              setPartyPokemon={setPartyPokemon}
              setMachines={setMachines}
            />
          </div>
        </>
      ) : (
        <LoadingSpinner isCaught={isCaught} />
      )}
    </>
  )
}

export default PokeApp
