// in src/Dashboard.js
import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { Button, Snackbar } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import feathersClient from './feathersClient';

interface IFeathersData {
  total: number;
}

const Dashboard: React.FC = () => {
  const [totalMessage, setTotalMessage] = useState(0);
  const [snackBarStatus, setSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    feathersClient
      .service('message')
      .find({
        query: {
          $limit: 0,
        },
      })
      .then((result: IFeathersData) => {
        setTotalMessage(result.total);
      })
      .catch((error: Error) => {
        console.error(error.message);
        setSnackbar(true);
      });
  }, [totalMessage]);

  return (
    <React.Fragment>
      <Title title="Welcome to Tell Secret Message for Someone" />
      <Card>
        <CardContent>Your total messages: {totalMessage}</CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarStatus}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Failed to open message"
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={handleCloseSnackbar}
            >
              OK
            </Button>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default Dashboard;
