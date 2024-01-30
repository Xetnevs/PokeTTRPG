import { useState, useEffect } from 'react'
import { sanitizeString } from 'src/utils.js'

const half = '½×'
const quarter = '¼×'
const times = '×'

const getMutliplierText = multiplier => {
  if (multiplier === 0.5) {
    return half
  }
  if (multiplier === 0.25) {
    return quarter
  }
  return `${multiplier}${times}`
}

const TypeWeaknessIcon = ({ type, multiplier, }) => {
  return (
    <span className="type-weakness-icon">
      <table className={`type-weakness-table ${type}`}>
        <tbody>
          <tr>
            <td>
              <b>
                <span className="type-weakness-icon-label">
                  {sanitizeString(type)}
                </span>
              </b>
            </td>
            <td className="type-weakness-modifier">
              {getMutliplierText(multiplier)}
            </td>
          </tr>
        </tbody>
      </table>
    </span>
  )
}

export default TypeWeaknessIcon
