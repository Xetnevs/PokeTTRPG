import { gql } from 'graphql-request'

export default gql`
  query queryForAll {
    species: pokemon_v2_pokemonspecies(limit: 10000) {
      name
      id
      evolves_from_species_id
      varieties: pokemon_v2_pokemons {
        name
        is_default
        height
        id
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
            id
          }
          slot
        }
        base_stats: pokemon_v2_pokemonstats {
          value: base_stat
          stat: pokemon_v2_stat {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          slot
          ability: pokemon_v2_ability {
            name
            id
          }
        }
        moves: pokemon_v2_pokemonmoves(
          where: {
            pokemon_v2_movelearnmethod: {
              _or: [{ name: { _eq: "level-up" } }, { name: { _eq: "machine" } }]
            }
          }
          distinct_on: move_id
        ) {
          level
          learn_method: pokemon_v2_movelearnmethod {
            name
          }
          move_id
        }
        sprites: pokemon_v2_pokemonsprites {
          sprites
        }
      }
      evolves_to: pokemon_v2_pokemonspecies {
        name
        id
        evolution_method: pokemon_v2_pokemonevolutions {
          min_happiness
          min_level
          needs_overworld_rain
          relative_physical_stats
          time_of_day
          turn_upside_down
          use_item: pokemon_v2_item {
            name
          }
          held_item: pokemonV2ItemByHeldItemId {
            name
          }
          trade_for_species: pokemonV2PokemonspecyByTradeSpeciesId {
            name
          }
          type_in_party: pokemonV2TypeByPartyTypeId {
            name
          }
          pokemon_in_party: pokemonV2PokemonspecyByPartySpeciesId {
            name
          }
          evolution_trigger: pokemon_v2_evolutiontrigger {
            name
          }
          gender: pokemon_v2_gender {
            name
          }
          move: pokemon_v2_move {
            name
          }
          move_type: pokemon_v2_type {
            name
          }
        }
      }
    }
    types: pokemon_v2_type(where: { id: { _lt: 10000 } }) {
      id
      name
      efficacies: pokemon_v2_typeefficacies(
        where: { damage_factor: { _neq: 100 } }
      ) {
        damage_factor
        id
        type: pokemonV2TypeByTargetTypeId {
          name
        }
      }
    }
    abilities: pokemon_v2_ability {
      id
      name
      effect_description: pokemon_v2_abilityeffecttexts(
        where: { pokemon_v2_language: { name: { _eq: "en" } } }
      ) {
        short_effect
      }
    }
    moves: pokemon_v2_move {
      id
      accuracy
      name
      move_effect_chance
      power
      pp
      damage_class: pokemon_v2_movedamageclass {
        name
      }
      type: pokemon_v2_type {
        name
      }
      move_effect: pokemon_v2_moveeffect {
        effect_description: pokemon_v2_moveeffecteffecttexts(
          where: { pokemon_v2_language: { name: { _eq: "en" } } }
        ) {
          short_effect
          effect
        }
      }
    }
  }
`
