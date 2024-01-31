import 'src/LoadingSpinner/loading.css'

import PropTypes from 'prop-types'

const LoadingSpinner = ({ isCaught }) => (
  <div className="loading-container">
    <div className={`pokeball${isCaught ? ' caught' : ''}`}></div>
  </div>
)

LoadingSpinner.propTypes = {
  isCaught: PropTypes.bool,
}

export default LoadingSpinner
