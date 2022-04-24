import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNewsFeed, getNewsFeeds, getSingleNewsFeed, updateIconButton, updateStateModal } from "./redux/actions/newxfeedAction";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BOOKMARK_POST, UPDATE_REACTION } from "./redux/types";



const Post = ({ postInfo }) => {
  const { description, photo, reaction, id, bookmarked, userName, userUrl, email } = postInfo
  const [isFavourite, setIsFavourite] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(true)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentUser } = useSelector(state => state.authentication)
  console.log(currentUser.email)
  console.log(email)
  // const isOpen = useSelector(state => state.newsfeed.openModel)

  const handleClick = (event) => {
    if (email === currentUser?.email) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    // dispatch(updateStateModal(false))
  };

  useEffect(() => {
    dispatch(getNewsFeeds())
  }, [])

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar src={userUrl} />
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
        }
        title={userName}
        subheader="September 14, 2022"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="20%"
        image={photo}
        alt="_"
      />
      <CardActions disableSpacing>

        <IconButton aria-label="add to favorites"
          onClick={() => {
            if (!currentUser?.email) {
              dispatch(updateStateModal(true))
            } else {
              dispatch(updateIconButton(UPDATE_REACTION, isFavourite, id))
              dispatch(updateStateModal(false))
              setIsFavourite(!isFavourite)
            }

          }}
        >
          {reaction ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
        </IconButton>
        <IconButton aria-label="bookmark"
          onClick={() => {
            if (!currentUser?.email) {
              dispatch(updateStateModal(true))
            } else {
              dispatch(updateIconButton(BOOKMARK_POST, isBookmarked, id))
              dispatch(updateStateModal(false))
              setIsBookmarked(!isBookmarked)
            }
          }}
        >
          {bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}

        </IconButton>
      </CardActions>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          dispatch(updateStateModal(false))
          dispatch(getSingleNewsFeed(id))
        }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          // dispatch(updateStateModal(false))
          dispatch(deleteNewsFeed(id))
        }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Card >
  );
};

export default Post;