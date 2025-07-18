import React from 'react';
import { Admin, Resource } from 'react-admin';
import { restClient, authClient } from 'ra-data-feathers';
import feathersClient from './feathersClient';
import Dashboard from './Dashboard';
import { UsersList } from './services/Users';
import { MessageList, MessageInsert, MessageShow } from './services/Message';

const authClientOptions = {
  storageKey: 'token', // The key in localStorage used to store the authentication token
  authenticate: {
    // Options included in calls to Feathers client.authenticate
    strategy: 'local', // The authentication strategy Feathers should use
  },
  permissionsKey: 'permissions', // The key in localStorage used to store permissions from decoded JWT
  permissionsField: 'permissions', // The key in the decoded JWT containing the user's role
  passwordField: 'password', // The key used to provide the password to Feathers client.authenticate
  usernameField: 'email', // The key used to provide the username to Feathers client.authenticate
  redirectTo: '/login', // Redirect to this path if an AUTH_CHECK fails. Uses the react-admin default of '/login' if omitted.
  logoutOnForbidden: true, // Logout when response status code is 403
};

const restClientOptions = {
  id: 'id', // If your database uses an id field other than 'id'. Optional.
  usePatch: true, // Use PATCH instead of PUT for UPDATE requests. Optional.
};

const App: React.FC = () => {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={restClient(feathersClient, restClientOptions)}
      authProvider={authClient(feathersClient, authClientOptions)}
    >
      <Resource name="users" list={UsersList} />
      <Resource
        name="message"
        list={MessageList}
        create={MessageInsert}
        show={MessageShow}
      />
    </Admin>
  );
};

export default App;
