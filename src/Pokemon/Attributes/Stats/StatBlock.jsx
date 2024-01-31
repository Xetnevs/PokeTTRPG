import 'src/Pokemon/Attributes/Stats/stats.css'

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
    {children && <span className="stat-info">{children}</span>}
  </div>
)

export default StatBlock
