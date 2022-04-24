import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import LoginRegistration from './LoginRegistration';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateStateModal } from '../redux/actions/newxfeedAction';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const LoginRegModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector(state=> state.newsfeed.openModel)
    return (
        <div>
            <Dialog
                fullWidth
                maxWidth='md'
                open={isOpen}
                TransitionComponent={Transition}
                onClose={() => dispatch(updateStateModal(false))}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <LoginRegistration />
                </Box>
            </Dialog>
        </div>
    )
}

export default LoginRegModal