import React from 'react';
// @ts-ignore
import { List, Datagrid, TextField } from 'react-admin';

export const MessageList: React.FC = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="text" />
    </Datagrid>
  </List>
);