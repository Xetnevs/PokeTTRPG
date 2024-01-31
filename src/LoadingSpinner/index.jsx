import 'src/LoadingSpinner/loading.css'

const LoadingSpinner = ({ isCaught }) => (
  <div className="loading-container">
    <div className={`pokeball${isCaught ? ' caught' : ''}`}></div>
  </div>
)

export default LoadingSpinner
