import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps
{
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) =>
{
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function CustomizedDialogs()
{
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () =>
    {
        setOpen(true);
    };
    const handleClose = () =>
    {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                !
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    users list
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Note - only users who have been active in the last 90 days are displayed here
                    </Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
