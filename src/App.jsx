import { useState, useEffect } from 'react'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import LoadingSpinner from 'src/LoadingSpinner'
import Pokemon from 'src/Pokemon'
import 'src/App.css'

function App() {
  const { isLoading: isPokedexLoading } = usePokedex()
  const [{ isLoading: isCustomConfigLoading }, _] = useCustomConfig()
  const [isLoading, setIsLoading] = useState(
    isPokedexLoading || isCustomConfigLoading
  )
  const [isCaught, setIsCaught] = useState(false)

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
    <>{!isLoading ? <Pokemon /> : <LoadingSpinner isCaught={isCaught} />}</>
  )
}

export default App
