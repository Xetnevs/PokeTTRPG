import 'src/Pokemon/Attributes/Stats/stats.css'

import PropTypes from 'prop-types'

const StatBlock = ({
  label,
  value,
  singleColumn,
  disabled,
  onChange,
  children,
  type = 'number',
  max = 1000,
}) => (
  <div
    className={`stat-group${singleColumn ? ' single-column' : ''}${children ? ' double-row' : ''}`}
  >
    <span className="stat-label">{label}:</span>
    <input
      className="stat-input"
      value={value}
      type={type}
      step="1"
      onChange={onChange}
      disabled={disabled}
      max={max}
    />
    {children && <span className="stat-info hide-on-print">{children}</span>}
  </div>
)

StatBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  singleColumn: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.array,
  type: PropTypes.string,
  max: PropTypes.number,
}

export default StatBlock
