import 'react-nested-dropdown/dist/styles.css'
import 'src/Pokemon/Attributes/Sprite/sprite.css'

import { isObject, reduce } from 'lodash'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-nested-dropdown'
import { sanitizeString } from 'src/utils.js'

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
        {({ _, onClick }) => (
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

PokemonSprite.propTypes = {
  pokemonState: PropTypes.shape({
    species: PropTypes.shape({
      varieties: PropTypes.objectOf(
        PropTypes.shape({
          sprites: PropTypes.shape({
            front_default: PropTypes.string,
            versions: PropTypes.objectOf(
              PropTypes.shape({
                url: PropTypes.string,
              })
            ).isRequired,
            other: PropTypes.object.isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
    sprite: PropTypes.string,
    selectedVariety: PropTypes.number.isRequired,
  }).isRequired,
  onPokemonStateChange: PropTypes.func.isRequired,
}

export default PokemonSprite
