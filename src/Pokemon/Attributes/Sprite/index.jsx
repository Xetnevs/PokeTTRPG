import { useState, useEffect } from 'react'
import { sanitizeString } from 'src/utils.js'
import { isEmpty, isObject, reduce } from 'lodash'
import { Dropdown } from 'react-nested-dropdown'
import 'react-nested-dropdown/dist/styles.css'
import 'src/Pokemon/Attributes/Sprite/sprite.css'

const mapToDropdownItems = onSelect => (result, value, key) => {
  if (isObject(value)) {
    return [
      ...result,
      {
        label: sanitizeString(key),
        items: reduce(value, mapToDropdownItems(onSelect), []),
      },
    ]
  } else if (value) {
    return [
      ...result,
      {
        label: sanitizeString(key),
        url: value,
        onSelect: () => onSelect(value),
      },
    ]
  }
  return result
}

const PokemonSprite = ({
  pokemon,
  pokemonState: { sprite, selectedVariety },
  onPokemonStateChange,
}) => {
  const items = reduce(
    {
      ...pokemon.varieties[selectedVariety].sprites.versions,
      ['official-artwork']:
        pokemon.varieties[selectedVariety].sprites.other['official-artwork'],
    },
    mapToDropdownItems(url =>
      onPokemonStateChange({
        sprite: url,
      })
    ),
    []
  )

  return (
    <div className="sprite-container">
      <Dropdown items={items} containerWidth="300px">
        {({ isOpen, onClick }) => (
          <img
            className="pokemon-sprite"
            onClick={onClick}
            src={
              sprite ||
              pokemon.varieties[selectedVariety].sprites.other[
                'official-artwork'
              ].front_default
            }
          />
        )}
      </Dropdown>
    </div>
  )
}

export default PokemonSprite
