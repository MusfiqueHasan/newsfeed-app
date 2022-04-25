import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add as AddIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { createNewsFeeds, getNewsFeeds, updateNewsFeed, updateStateDialog, updateStateModal, updateStateNewsFeed } from './redux/actions/newxfeedAction';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const initPost = {
  description: '',
  photo: '',
  reaction: false,
  bookmarked: false,
  bookmarkedUserEmail: '',
  userName: '',
  userUrl: '',
  email: '',
  createdDate: 0,
}

const Add = () => {


  const [post, setPost] = useState(initPost)
  const [selectImage, setSelectImage] = useState('');
  const dispatch = useDispatch()
  const singlePost = useSelector((state) => state?.newsfeed?.post)
  const isDialogOpen = useSelector((state) => state?.newsfeed?.openDialog)
  console.log(singlePost.id)
  const { currentUser } = useSelector(state => state.authentication)

  // encode product image to base64
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      const lastDot = file.name.lastIndexOf(".");
      const ext = file.name.substring(lastDot + 1);
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        const data = { ...post, photo: Base64 }
        setPost(data)
      };
    }
  };

  useEffect(() => {
    if (singlePost) {
      setPost(singlePost)
    }

  }, [singlePost])

  useEffect(() => {
    dispatch(getNewsFeeds())
    dispatch(updateStateNewsFeed(initPost))
  }, [dispatch])

  return (
    <>
      <Tooltip
        onClick={() => {
          if (currentUser?.email) {
            dispatch(updateStateDialog(true))
            dispatch(updateStateModal(false))
          } else {
            dispatch(updateStateDialog(false))
            dispatch(updateStateModal(true))
          }
        }}
        title="Create Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={isDialogOpen}
        onClose={(e) => {
          dispatch(updateStateDialog(false))
          dispatch(updateStateModal(false))
          setPost(initPost)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={500}
          height={400}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          sx={{ overflowY: 'scroll' }}
        >

          <Typography variant="h6" color="gray" textAlign="center">
            {singlePost.id ? 'Edit' : 'Create'} post
          </Typography>
          <UserBox>
            <Avatar
              src={currentUser?.photoURL}
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="span">
              {currentUser?.displayName}
            </Typography>
          </UserBox>
          <TextField
            value={post?.description}
            onChange={(e) =>
              setPost({ ...post, description: e.target.value })
            }
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={2}
            placeholder="What's on your mind?"
            variant="standard"
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            {/*.............This Grid for upload image............ */}
            <Box sx={{ width: '100%' }}>
              <Box>
                <label htmlFor="icon-button-file">
                  <input
                    onChange={(e) => {
                      setSelectImage(e.target.files[0])
                      encodeFileBase64(e.target.files[0])
                    }}
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"

                  />
                  <IconButton color="primary" aria-label="upload picture" component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              {selectImage &&
                <CancelPresentationIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectImage('')
                    setPost({ ...post, photo: '' })
                  }}
                />
              }
              <Box sx={{ width: '100%' }}>
                {
                  (post?.photo && selectImage === '') ?
                    <img src={post?.photo} width='100%' height='500px' alt="" visibility='visible' /> :
                    selectImage && <img src={URL.createObjectURL(selectImage)} width='100%' height='500px' alt="" visibility='visible' />
                }
              </Box>
            </Box>
            { /*......................... */}
          </Stack>

          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
            sx={{}}
          >
            <Button onClick={() => {
              let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              let date = new Date()
              let copyPost = { ...post }
              copyPost.userName = currentUser?.displayName
              copyPost.userUrl = currentUser?.photoURL
              copyPost.email = currentUser?.email
              copyPost.createdDate = Date.now()
              copyPost.date = date.toLocaleString('en-US', options)

              if (singlePost.id) { dispatch(updateNewsFeed(copyPost, copyPost.id)) } else { dispatch(createNewsFeeds(copyPost)) }
              dispatch(updateStateModal(false))
              dispatch(updateStateDialog(false))
              setPost(initPost)
              setSelectImage('')
            }}>
              Post
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;