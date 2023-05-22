import React from 'react';
import { Button, useTheme, useMediaQuery, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
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
  const [decrypting, setDecrypting] = React.useState(false);
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
    setDecrypting(true);
    const text = record[source];
    const id = record['id'];
    // TODO: remove this, temporary debug
    console.log(id, text, value);
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
      .catch(() => setOpenSnackbar(true))
      .finally(() => {
        setOpen(false);
        setValue('');
        setDecrypting(false);
      });
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
          <LoadingButton
            loading={decrypting}
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            loading={decrypting}
            onClick={handleSubmit}
            color="primary"
          >
            Open
          </LoadingButton>
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
            <p dangerouslySetInnerHTML={{ __html: message }}></p>
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
