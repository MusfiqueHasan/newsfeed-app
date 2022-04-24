import { Box, Stack, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { getNewsFeeds } from "./redux/actions/newxfeedAction";

const Feed = () => {
  const dispatch = useDispatch()
  const allPosts = useSelector((state) => state?.newsfeed?.posts)
  const loading = useSelector((state) => state?.newsfeed?.loading)


  useEffect(() => {
    dispatch(getNewsFeeds())
  }, [])
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {
            allPosts?.map(postInfo => {
              return (
                <Post postInfo={postInfo} />
              )
            })
          }
        </>
      )}
    </Box>
  );
};

export default Feed;