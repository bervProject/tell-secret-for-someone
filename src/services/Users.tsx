import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

/* eslint-disable @typescript-eslint/no-explicit-any*/
export const UsersList: React.FC = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="permissions" />
    </Datagrid>
  </List>
);
