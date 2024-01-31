import { useContext } from 'react'
import CustomConfigContext from 'src/Contexts/CustomConfigContext/Context'

export const useCustomConfig = () => {
  return useContext(CustomConfigContext)
}
