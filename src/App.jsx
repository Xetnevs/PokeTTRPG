import { useState, useEffect } from 'react'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import LoadingSpinner from 'src/LoadingSpinner'
import Pokemon from 'src/Pokemon'
import 'src/App.css'

function App() {
  const { isLoading: isPokedexLoading } = usePokedex()
  const [{ isLoading: isCustomConfigLoading }, updateCustomConfig] =
    useCustomConfig()
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
          {Array.from({ length: partySize }).map(() => (
            <Pokemon />
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
