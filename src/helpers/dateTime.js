import {DateTime} from 'luxon'
import {Platform} from 'react-native'

/**
 * Take a date formatted in the user's local time
 * and return the same date in the patient's local time
 * e.g. 6:00PM user time -> 6:00PM patient time
 * We don't apply TZ math b/c it's assumed all times
 * are in the patient's local, even those entered by a user
 * in a differetn TZ
 * @param {object} date native JS Date or luxon DateTime in the user's local time
 * @param {string} timeZone a valid IANA timezone, e.g. America/Chicago
 * @returns {object} luxon DateTime using the patient's local time
 */
export function changeTimezoneOnly(date, timeZone) {
  const luxonDate = date instanceof DateTime ? date : DateTime.fromJSDate(date)

  return luxonDate.setZone(timeZone, {keepLocalTime: true})
}

/**
 * Take a date and convert it to the patient's timezone
 * @param {object} date native JS Date or luxon DateTime in any timezone
 * @param {string} timeZone a valid IANA timezone, e.g. America/Chicago
 * @returns {object} luxon DateTime using the patient's local time
 */
export function toPatientLocalTime(date, timeZone) {
  const luxonDate = date instanceof DateTime ? date : DateTime.fromJSDate(date)

  return luxonDate.setZone(timeZone)
}

export function patientTimeZone(luxonDate, homeInfo) {
  if (Platform.OS === 'android') {
    // Android react-native lack good Intl support, so we have to do a bit of
    // our date math unfortunately: take the luxonDate local, check if it is DST
    // and then use that to determine whether to use the DST offset from the API
    // or not. Note, this is an imperfect way of doing things, because yes, it
    // is possible for the phone to be in DST and the home isn't or vice versa--
    // for example, if the time is set for exactly midnight on the day of a DST
    // transition or the home is in DST in LA and the phone is in Arizona.
    if (luxonDate.isInDST) {
      return `UTC${homeInfo.DstUtcOffset}`
    } else {
      return `UTC${homeInfo.UtcOffset}`
    }
  } else {
    return homeInfo.TimeZone
  }
}

/**
 * Get a luxon DateTime object set to the patient's current time
 * @param {string} timeZone a valid IANA timezone, e.g. America/Chicago
 * @returns {object} a luxon DateTime in the patient's local time
 */
export function currentPatientTime(timeZone) {
  return DateTime.local().setZone(timeZone).setZone('local', {keepLocalTime: true})
}