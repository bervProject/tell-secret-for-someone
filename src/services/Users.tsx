import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const UsersList: React.FC = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="permissions" />
    </Datagrid>
  </List>
);
