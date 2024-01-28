import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { sanitizeString } from 'src/utils.js'

const PokemonNameTrainerInfo = ({
  pokemon,
  pokemonState: { nickname = '', trainer = '' },
  onPokemonStateChange,
}) => (
  <>
    {!isEmpty(pokemon) && (
      <>
        <div className="label-input-pair">
          <span className="name-label">Nickname:</span>
          <input
            className="name-input"
            value={nickname}
            onChange={e => onPokemonStateChange({ nickname: e.target.value })}
          />
        </div>
        <div className="label-input-pair">
          <span className="trainer-label">OT:</span>
          <input
            className="trainer-input"
            value={trainer}
            onChange={e => onPokemonStateChange({ trainer: e.target.value })}
          />
        </div>
      </>
    )}
  </>
)

export default PokemonNameTrainerInfo
