import { useContext } from 'react'
import PokedexContext from 'src/Contexts/PokedexContext/Context'

export const usePokedex = () => {
  return useContext(PokedexContext)
}
