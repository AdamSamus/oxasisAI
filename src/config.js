import Constants from 'expo-constants'
const RELEASE_CHANNEL = Constants.manifest.releaseChannel || 'production';


const production = {oxasisURL: 'https://oxasis.com/api', apiURL: 'https://oxasis.com/user', timeout: 10000,};
const dev = {oxasisURL: 'https://test.oxasis.com/api', apiURL: 'https://test.oxasis.com/user', timeout: 3000,};

module.exports = {default: production, dev,  production}[RELEASE_CHANNEL]

