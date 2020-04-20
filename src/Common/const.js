
import {oxasisEndpoint, oxasisHeaders} from '../helpers/api'

export const info = {
    authUser: null
}

export const userAccess = (UserAccessParam) => {
    
    if (info.authUser) {
        UserAccessParam.date = new Date().getTime()
        const userAccessUrl = oxasisEndpoint('UserAccess', UserAccessParam)
        //console.log(userAccessUrl)

        fetch(userAccessUrl, {
            method: 'POST',
            headers: oxasisHeaders(info.authUser)
        })
    } else {
        //console.log('auth user is null')
    }
}
