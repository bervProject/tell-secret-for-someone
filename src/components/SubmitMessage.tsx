import React from 'react';
import { Button, useTheme, useMediaQuery, Snackbar } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import feathersClient from '../feathersClient';

/* eslint-disable @typescript-eslint/no-explicit-any*/
interface CustomComponent {
  source: any;
  record: { [index: string]: any };
}

const SubmitMessage: any = ({ source, record = {} }: CustomComponent) => {
  const [open, setOpen] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    setValue('');
    const text = record[source];
    const id = record['id'];
    if (!id || !text || !value) {
      return false;
    }
    feathersClient
      .service('message')
      .get(id, { headers: { key: value } })
      .then((result: any) => {
        const message = result.text;
        setMessage(message);
        setOpenMessage(true);
      })
      .catch(() => setOpenSnackbar(true));
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Show Message
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="fmd-title-custom"
      >
        <DialogTitle id="fmd-title-custom">Please Input Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To open the message, please input the password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password-message"
            label="Password"
            type="password"
            fullWidth
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Open
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openMessage}
        onClose={handleCloseMessage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'This is your message!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessage} color="primary" autoFocus>
            Thanks!
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
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
    </div>
  );
};

export default SubmitMessage;
