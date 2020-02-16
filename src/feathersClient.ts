import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';

import axios from 'axios';

const app = feathers();

// Connect to a different URL
const restClient = rest('http://localhost:3030')

// Configure an AJAX library (see below) with that client
app.configure(restClient.axios(axios));
app.configure(auth({
  storageKey: 'token'
}));

export default app;