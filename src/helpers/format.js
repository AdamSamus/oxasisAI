/**
 * create a query string (no ?) by encoding the key/value pairs in params
 * @param {object} params object of key/value pairs
 * @returns {string} uri-encoded query string from the params
 */
export function queryString(params) {
  return Object.keys(params).map((key) => {
    const raw = params[key]
    const value = typeof raw === 'undefined' || raw === null ? '' : raw

    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }).join('&')
}
