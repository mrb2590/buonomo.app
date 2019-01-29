/**
 * Get an object from local storage.
 */
export function getSavedState (key, type = 'local') {
  return JSON.parse(window[`${type}Storage`].getItem(key));
}

/**
 * Save an object in local storage.
 */
export function saveState (key, value, type = 'local') {
  window[`${type}Storage`].setItem(key, JSON.stringify(value));
}

/**
 * Process errors from backend form validation.
 */
export function processInvalidForm (error, defaultMsg = 'There was an error.') {
  let msg = '';
  if (error.response.status === 422) {
    for (let errorType in error.response.data.errors) {
      error.response.data.errors[errorType].forEach(errorMsg => {
        msg += ` ${errorMsg}`;
      });
    }
  } else if (typeof error.response.data.message !== 'undefined') {
    msg = error.response.data.message;
  } else {
    msg = 'The was an error.';
  }
  return msg;
}
