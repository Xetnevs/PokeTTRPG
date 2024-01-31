import 'src/App.css'

import { useCallback, useEffect, useState } from 'react'
import MemeApp from 'src/MemeApp'
import PokeApp from 'src/PokeApp'

const App = () => {
  const [isMeme, setIsMeme] = useState(false)

  const keydownHandler = useCallback(
    e => {
      if ((e.key === 'Q' || e.key === 'q') && e.ctrlKey) {
        setIsMeme(!isMeme)
      }
    },
    [isMeme]
  )
  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  }, [keydownHandler])

  return <>{isMeme ? <MemeApp /> : <PokeApp />}</>
}

export default App
