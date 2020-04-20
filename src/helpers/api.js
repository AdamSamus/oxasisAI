import {oxasisURL} from '../config'
import {queryString} from './format'

const DEFAULT_ERROR_MSG = 'There was an error'

export function oxasisEndpoint(action, params = {}) {
  const base = `${oxasisURL}/${action}`
  const query = queryString(params)
  return query ? `${base}?${query}` : base
}

export function oxasisHeaders(user = null) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  if (user && user.token) {
    headers.Authorization = `Bearer ${user.token}`
  }
  return headers
}

/**
 * return the error message to be used in an alert
 * @param {string} field the field with the error
 * @param {array} messages an array of errors on the field
 * @returns {string} returns the error string for the field
 */
function buildErrorMessage(field, messages) {
  const uniqMessages = [...new Set(messages)]
  const fieldsString = uniqMessages.join(', ')

  return [field, fieldsString].join(' ')
}

export function apiErrorAlert(errors, title = DEFAULT_ERROR_MSG) {
  if (errors) {
    const message = Object.keys(errors).map((key, _index) => (
      buildErrorMessage(key, errors[key])
    )).join('\n\n')

    return {title: DEFAULT_ERROR_MSG, message}
  }

  return {title, message: ''}
}
