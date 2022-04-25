import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, Slide, Table, TableBody, TableCell, TableContainer, TableRow, } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookmarkButton } from './redux/actions/newxfeedAction';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BookmarkDialog = ({ openDialog, handleCloseDialog, bookmarkedData }) => {
    const [isBookmarked, setIsBookmarked] = useState(true)
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
                                                <img width="50px" alt="_" src={data.photo} />
                                            </TableCell>
                                            <TableCell >
                                                {data.description}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="bookmark"
                                                    onClick={() => {
                                                        dispatch(updateBookmarkButton(isBookmarked, currentUser?.email, data.id))
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