import React, { useState } from 'react';
import { Checkbox, Dialog, DialogContent, IconButton, Slide, Table, TableBody, TableCell, TableContainer, TableRow, } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookmarkButton } from './redux/actions/newxfeedAction';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BookmarkDialog = ({ openDialog, handleCloseDialog, bookmarkedData }) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.authentication)
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
                                                <img width="50px" alt="_" src={data?.photo} />
                                            </TableCell>
                                            <TableCell >
                                                {data?.description}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    onChange={(e) => {
                                                        dispatch(updateBookmarkButton(e.target.checked, currentUser?.email, data?.id))
                                                    }}
                                                    icon={data?.bookmarked ? <BookmarkIcon color='primary'/> : <BookmarkBorderIcon  />}
                                                    checkedIcon={<BookmarkIcon color='primary'/>}
                                                />
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