const sdk = require('postman-collection');
const path =  pm.environment.get('accessTokenUrl');
const clientId = pm.environment.get('clientId');
const clientSecret = pm.environment.get('clientSecret');
const authorisation = btoa(`${clientId}:${clientSecret}`)
const scope = pm.environment.get('scope');
console.log('client stuff ', clientId, clientSecret);
let options = {
  url: path,
  method: 'POST',
  header: { 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + authorisation
  },
  body: {
    mode: 'raw',
    raw: `grant_type=client_credentials&scope=${scope}`
  }
}
const tokenRequest = new sdk.Request(options);
console.log('options: ', options);
console.log('tokenRequest: ', tokenRequest);

pm.sendRequest(tokenRequest, function(err, response) {

  console.log('request sent: ', err, response);
  const json = response.json();
  console.log({err, response})
  const accessToken = json.access_token;
  const tokenType = json.token_type;
  const bearer = tokenType + ' ' + accessToken;
  console.log(`Bearer Value: ${bearer}`);
  pm.environment.set('accessToken', bearer);

});









