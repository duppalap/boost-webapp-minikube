import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

interface BoostDialogProps {
  title: string;
  text: string;
  open: boolean;
  handleSubmit: any;
}

export default function BoostDialog(props: BoostDialogProps) {
  const { title, open, handleSubmit, text } = props;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog
      open={dialogOpen}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" sx={{ pb: 2 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" sx={{ pb: 2 }}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
