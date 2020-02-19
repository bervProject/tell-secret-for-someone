import React from 'react';
import {
  List,
  Create,
  Show,
  SimpleShowLayout,
  SimpleForm,
  Datagrid,
  TextField,
  TextInput,
  ShowButton,
  PasswordInput
}
  // @ts-ignore
  from 'react-admin';

import SubmitMessage from '../components/SubmitMessage';

export const MessageList: React.FC = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="text" />
      <ShowButton />
    </Datagrid>
  </List>
);

export const MessageInsert: React.FC = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput multiline source="text" />
      <PasswordInput source="messagePassword" />
    </SimpleForm>
  </Create>
);

export const MessageShow: React.FC = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="text" />
      <SubmitMessage source="text" />
    </SimpleShowLayout>
  </Show>
);