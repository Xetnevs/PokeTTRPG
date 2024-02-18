import { isEmpty, reduce } from 'lodash'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { usePokedex } from 'src/Contexts/PokedexContext'

const MachineSelector = ({ machine, onMachineStateChange }) => {
  const [selected, setSelected] = useState([])
  const Pokedex = usePokedex()

  const machines = reduce(
    Pokedex.pokemonData.moves,
    (acc, value) => [...acc, value],
    []
  )

  useEffect(() => {
    if (!isEmpty(machine)) {
      setSelected([machine])
    }
  }, [machine])

  return (
    <>
      <Typeahead
        className="machine-input hide-on-print"
        labelKey="name"
        id="MachineSelector"
        clearButton
        onChange={move => {
          setSelected(move)
          if (move?.length) {
            onMachineStateChange(move[0])
          }
        }}
        options={machines || []}
        placeholder="Show me your moves"
        selected={selected || []}
        inputProps={{
          style: {
            minWidth: machine?.name ? `${machine.name.length + 6}ch` : 'auto',
          },
        }}
      />
      <span className="move-name show-on-print">{machine?.name}</span>
    </>
  )
}

MachineSelector.propTypes = {
  machine: PropTypes.object,
  onMachineStateChange: PropTypes.func,
}

export default MachineSelector
