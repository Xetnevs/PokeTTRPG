import { sha256 } from 'js-sha256'
import localForage from 'localforage'

const defaultExpiration = 60 * 60 * 1000 // one hour

const pokettrpgStore = localForage.createInstance({
  name: 'pokettrpg',
})

const getExpirationKey = key => {
  const hash = sha256.update(key).hex().substring(0, 8)

  return `${key}_expires_${hash}`
}

const hasExpired = expires => {
  if (expires === Infinity) {
    return false
  }

  if (isNaN(expires)) {
    return false
  }

  return expires < Date.now()
}

//local version of localforage-cache
export const setItemWithCache = async (
  key,
  value,
  expires = defaultExpiration + Date.now()
) => {
  const expirationKey = getExpirationKey(key)

  let expiresTimestamp = expires

  // If we get a date object, turn it into a timestamp
  if (expires instanceof Date) {
    expiresTimestamp = expires.getTime()
  }

  await pokettrpgStore.setItem(key, value)
  return pokettrpgStore.setItem(expirationKey, expiresTimestamp)
}

export const getItemFromCache = async key => {
  const expirationKey = getExpirationKey(key)
  const expires = await pokettrpgStore.getItem(expirationKey)

  // If we don't find an experation date, just return the value
  if (expires === null) {
    return pokettrpgStore.getItem(key)
  }

  const hasCacheExpired = hasExpired(expires)

  // If the item has expired, remove it from the cache
  if (hasCacheExpired) {
    await pokettrpgStore.removeItem(key)
    return null
  }

  return pokettrpgStore.getItem(key)
}

export const removeItem = async key => {
  const expirationKey = getExpirationKey(key)
  const removeValue = pokettrpgStore.removeItem(key)
  const removeExpiration = pokettrpgStore.removeItem(expirationKey)

  return Promise.all([removeValue, removeExpiration])
}

export default pokettrpgStore
