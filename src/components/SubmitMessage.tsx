import React from 'react';
import { Button, useTheme, useMediaQuery } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import feathersClient from '../feathersClient';

// @ts-ignore
const SubmitMessage: any = ({ source, record = {} }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    setValue('');
    let text = record[source];
    let id = record["id"];
    if (!id || !text || !value) {
      return false;
    }
    feathersClient.service('message').get(id, { headers: { key: value } });
  }

  return (
    <div>
      <Button color='primary' variant='contained' onClick={handleClickOpen}>Show Message</Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="fmd-title-custom">
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
    </div>
  );
};

export default SubmitMessage;