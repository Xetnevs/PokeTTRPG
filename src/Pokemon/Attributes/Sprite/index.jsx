import { useState, useEffect } from 'react'
import { sanitizeString } from 'src/utils.js'
import { isEmpty, isObject, reduce } from 'lodash'
import { Dropdown } from 'react-nested-dropdown'
import 'react-nested-dropdown/dist/styles.css'
import 'src/Pokemon/Attributes/Sprite/sprite.css'

const mapToDropdownItems = onSelect => (acc, value, key) => {
  if (isObject(value)) {
    const items = reduce(value, mapToDropdownItems(onSelect), [])
    if (items.length) {
      return [
        ...acc,
        {
          label: sanitizeString(key),
          items,
        },
      ]
    }
  } else if (value) {
    return [
      ...acc,
      {
        label: sanitizeString(key),
        url: value,
        onSelect: () => onSelect(value),
      },
    ]
  }
  return acc
}

const PokemonSprite = ({
  pokemonState: { species, sprite, selectedVariety },
  onPokemonStateChange,
}) => {
  const officialArt =
    species.varieties[selectedVariety].sprites.other['official-artwork']
  const front_default =
    species.varieties[selectedVariety].sprites['front_default']
  const items = reduce(
    {
      ...species.varieties[selectedVariety].sprites.versions,
      ['official-artwork']: officialArt,
    },
    mapToDropdownItems(url =>
      onPokemonStateChange({
        sprite: url,
      })
    ),
    []
  ).sort((a, b) => a.label.localeCompare(b.label))

  return (
    <div className="sprite-container">
      <Dropdown items={items} containerWidth="300px">
        {({ isOpen, onClick }) => (
          <img
            className="pokemon-sprite"
            onClick={onClick}
            src={sprite || officialArt.front_default || front_default}
          />
        )}
      </Dropdown>
    </div>
  )
}

export default PokemonSprite
