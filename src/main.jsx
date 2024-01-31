// import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'src/index.css'

import ReactDOM from 'react-dom/client'
import App from 'src/App.jsx'
import CustomConfigContext from 'src/Contexts/CustomConfigContext'
import PokedexContext from 'src/Contexts/PokedexContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CustomConfigContext>
    <PokedexContext>
      <App />
    </PokedexContext>
  </CustomConfigContext>
  // </React.StrictMode>
)
