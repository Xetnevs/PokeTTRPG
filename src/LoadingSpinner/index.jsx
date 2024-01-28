import { useState, useEffect, useContext } from 'react'
import 'src/LoadingSpinner/loading.css'

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="pokeball"></div>
  </div>
)

export default LoadingSpinner
