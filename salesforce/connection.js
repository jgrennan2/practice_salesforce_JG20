const nforce = require('nforce');

/**
 * Creates connection to Salesforce CRM
 */

module.exports = nforce.createConnection({
  //clientID==consumer key
  clientId: process.env.SF_CLIENT_ID,
  //consumer secret
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: 'https://login.salesforce.com/services/oauth2/success',
  apiVersion: 'v43.0',
  mode: 'single',
  autoRefresh: true,
  //username
  username: process.env.SF_USERNAME,
  //password+securitytoken
  password: process.env.SF_PASSWORD,
  oauth: {
    //intital access token
    access_token: process.env.SF_ACCESS_TOKEN,
    //instance
    instance_url: process.env.SF_INSTANCE_URL,
  },
});
