/**
 * Get an object from local storage.
 *
 * @param  {string} key  The key of the item to fetch.
 * @param  {string} type The storage type to use (local|session).
 * @return {object}      The object from storage.
 */
export function getSavedState (key, type = 'local') {
  return JSON.parse(window[`${type}Storage`].getItem(key));
}

/**
 * Save an object in local storage.
 *
 * @param  {string} key   The key of the item to fetch.
 * @param  {string} value The value to save in storage.
 * @param  {string} type  The storage type to use (local|session).
 * @return {void}
 */
export function saveState (key, value, type = 'local') {
  window[`${type}Storage`].setItem(key, JSON.stringify(value));
}
