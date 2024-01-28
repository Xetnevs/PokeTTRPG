import { useState, useEffect, useContext } from 'react'
import 'src/Pokemon/Notes/notes.css'

const Notes = ({ pokemon, pokemonState: { notes }, onPokemonStateChange }) => (
  <div className="notes-container">
    <h5>Notes:</h5>
    <textarea
      className="notes"
      value={notes}
      onChange={e => onPokemonStateChange({ notes: e.target.value })}
    />
  </div>
)

export default Notes
