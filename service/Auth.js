//// Core modules

//// External modules
const axios = require('axios');

//// Modules


/**
 * Class for Authentication service
 * 
 * @example 
 * // Include module
 * let infobip = require('node-infobip');
 * 
 * // Basic authorization
 * let auth = new infobip.Auth('Basic', 'username', 'password');
 * 
 * // API key authorization
 * auth = new infobip.Auth('App', 'public-api-key');
 * 
 * // Token authorization
 * auth = new infobip.Auth('IBSSO', 'token');
 * 
 * // Passing auth to services
 * let sms = new infobip.SMS('CompanyA', 'https://api.infobip.com');
 * sms.authorize(auth);
 * 
 * // Do your thing
 * await sms.single('631234567890', 'Hello there!');
 */
class Auth {
    /**
     * Instantiate Auth class
     * 
     * @param {string} authType 
     * @param {string} tokenKeyOrUsername 
     * @param {string} password 
     * @throws {Error}
     */
    constructor(authType, tokenKeyOrUsername, password = '') {
        if (!['App', 'Basic', 'IBSSO'].includes(authType)) {
            throw new Error('Invalid authorization type.')
        }
        if (authType === 'Basic') {
            tokenKeyOrUsername = Buffer.from(`${tokenKeyOrUsername}:${password}`).toString('base64')
        }

        this.authType = authType
        this.tokenKeyOrUsername = tokenKeyOrUsername
    }

    /**
     * Create an axios instance
     * 
     * @param {string} contentType The type of data the API returns. Values: "json" or "xml"
     */
    axios(contentType) {
        let accept = 'application/json'
        if (contentType === 'xml') {
            accept = 'application/xml'
        }
        return axios.create({
            headers: {
                'Authorization': `${this.authType} ${this.tokenKeyOrUsername}`,
                'Content-Type': accept,
                'Accept': accept
            }
        });
    }

}

module.exports = Auth