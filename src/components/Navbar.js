import { Notifications, Pets } from "@mui/icons-material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkDialog from "./BookmarkDialog";
import LoginIcon from '@mui/icons-material/Login';
import LoginRegModal from "./LoginRegistration/LoginRegModal";
import LogoutIcon from '@mui/icons-material/Logout';
import { googleSignOutInitiate } from "./redux/actions/authAction";
import { updateStateModal } from "./redux/actions/newxfeedAction";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  width: '20%',
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: "flex",
  alignItems: "center",
  justifyContent: 'flex-start',
  gap: "10px",
}));


const Navbar = () => {
  const { currentUser } = useSelector(state => state.authentication)
  const allPosts = useSelector((state) => state?.newsfeed?.posts)
  const bookmarkedData = allPosts.filter(booked => booked.bookmarked === true)
  const dispatch = useDispatch()

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => { setOpenDialog(true) };
  const handleCloseDialog = () => { setOpenDialog(false) };

  
  const handleSignOut = () => {
    if (currentUser) {
      dispatch(googleSignOutInitiate())
    }
  };


  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          NEWSFEED
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          {currentUser &&
            <UserBox >
              <Avatar
                sx={{ width: 30, height: 30 }}
                src={currentUser?.photoURL}
              />
              <Typography variant="span">{currentUser?.displayName}</Typography>
            </UserBox>
          }
          <Badge badgeContent={bookmarkedData.length} color="error" sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenDialog()}
          >
            <BookmarkIcon />
          </Badge>
          {currentUser?.email ?
            <Tooltip title="Log out">
              <LogoutIcon sx={{ cursor: 'pointer' }} onClick={handleSignOut} />
            </Tooltip> :
            <Tooltip title="Log in">
              <LoginIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(updateStateModal(true))} />
            </Tooltip>
          }

        </Icons>

      </StyledToolbar>

      <BookmarkDialog openDialog={openDialog} handleCloseDialog={handleCloseDialog} bookmarkedData={bookmarkedData} />
      <LoginRegModal  />
    </AppBar >
  );
};

export default Navbar;