import { Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNewsFeed, getNewsFeeds, getSingleNewsFeed, updateBookmarkButton, updateReactButton, updateStateDialog, updateStateModal } from "./redux/actions/newxfeedAction";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const Post = ({ postInfo }) => {
  const { description, photo, reaction, id, bookmarked, userName, userUrl, email, date } = postInfo
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentUser } = useSelector(state => state.authentication)
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getNewsFeeds())
  }, [dispatch, bookmarked, reaction])

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar src={userUrl} />
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}
          >
            {(email === currentUser?.email) && <MoreVert />}
          </IconButton>
        }
        title={userName}
        subheader={date}
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

        <Checkbox
          onChange={(e) => {
            if (!currentUser?.email) {
              dispatch(updateStateModal(true))
            } else {
              dispatch(updateReactButton(e.target.checked, id))
            }
          }}
          icon={reaction ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
        />

        <Checkbox
          onChange={(e) => {
            if (!currentUser?.email) {
              dispatch(updateStateModal(true))
            } else {
              dispatch(updateBookmarkButton(e.target.checked, currentUser?.email, id))
            }
          }}
          icon={(bookmarked) ? <BookmarkIcon color='primary' /> : <BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon color='primary' />}
        />
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
          dispatch(updateStateDialog(true))
          dispatch(getSingleNewsFeed(id))
        }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
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