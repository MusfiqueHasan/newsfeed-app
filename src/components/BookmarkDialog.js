import React, { useState } from 'react';
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, List, ListItem, ListItemAvatar, ListItemText, Radio, RadioGroup, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { BOOKMARK_POST } from './redux/types';
import { useDispatch } from 'react-redux';
import { updateIconButton } from './redux/actions/newxfeedAction';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BookmarkDialog = ({ openDialog, handleCloseDialog, bookmarkedData }) => {
    const [isBookmarked, setIsBookmarked] = useState(true)
    const dispatch = useDispatch()
    return (
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth={'md'}

        >
            <DialogContent>
                {
                    bookmarkedData?.map(data => {
                        return (
                            <TableContainer >
                                <Table aria-label="simple table" size='small'>
                                    <TableBody>
                                        <TableRow  >
                                            <TableCell >
                                                <img width="50px" alt="_" src={data.photo} />
                                            </TableCell>
                                            <TableCell >
                                                {data.description}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="bookmark"
                                                    onClick={() => {
                                                        dispatch(updateIconButton(BOOKMARK_POST, isBookmarked, data.id))
                                                        setIsBookmarked(!isBookmarked)
                                                    }}
                                                >
                                                    {data.bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}

                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    })
                }


            </DialogContent>
        </Dialog>
    )
}

export default BookmarkDialog