import React from 'react';
import {
  List,
  Create,
  Show,
  SimpleShowLayout,
  SimpleForm,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  EmailField,
  TextInput,
  ShowButton,
  PasswordInput,
} from 'react-admin';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { RichTextInput } from 'ra-input-rich-text';

import SubmitMessage from '../components/SubmitMessage';

/* eslint-disable @typescript-eslint/no-explicit-any*/
export const MessageList: React.FC = (props: any) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.to}
          secondaryText={(record) => record.text}
          linkType="show"
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="text" />
          <TextField source="createdBy" />
          <DateField source="createdAt" />
          <EmailField source="to" />
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
};

export const MessageInsert: React.FC = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <RichTextInput source="text" />
      <TextInput type="email" source="to" />
      <PasswordInput source="messagePassword" required />
    </SimpleForm>
  </Create>
);

export const MessageShow: React.FC = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="text" />
      <EmailField source="to" />
      <TextField source="createdBy" />
      <DateField source="createdAt" />
      <SubmitMessage source="text" />
    </SimpleShowLayout>
  </Show>
);
