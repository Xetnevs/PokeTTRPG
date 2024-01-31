import 'src/App.css'

import { useEffect, useState } from 'react'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import { usePokedex } from 'src/Contexts/PokedexContext'
import LoadingSpinner from 'src/LoadingSpinner'
import Pokemon from 'src/Pokemon'

function App() {
  const { isLoading: isPokedexLoading } = usePokedex()
  const [{ isLoading: isCustomConfigLoading }, _] = useCustomConfig()
  const [isLoading, setIsLoading] = useState(
    isPokedexLoading || isCustomConfigLoading
  )
  const [isCaught, setIsCaught] = useState(false)
  const [partySize, setPartySize] = useState(1)

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
          {Array.from({ length: partySize }).map(i => (
            <Pokemon key={i} />
          ))}

          <div className="party-increase-button-container">
            <button
              className="party-increase-button"
              onClick={() => setPartySize(partySize + 1)}
            >
              <img src="src/Assets/plus.svg" />
            </button>
          </div>
        </>
      ) : (
        <LoadingSpinner isCaught={isCaught} />
      )}
    </>
  )
}

export default App
