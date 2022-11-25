import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  allPostQuerysApi,
  allPostsApi,
  createPostApi,
  getCommentApi,
  likeDislikeApi,
  postDeleteApi,
  singlePostApi,
} from "../actions/postAction";

// All Actions

export const createPost = createAsyncThunk("post/create", async (data) => {
  return createPostApi(data);
});
export const getAllPosts = createAsyncThunk("post/posts", async (page) => {
  return allPostsApi(page);
});
export const getSinglePost = createAsyncThunk("post/post", async (id) => {
  return singlePostApi(id);
});
export const getAllPostsQuery = createAsyncThunk(
  "post/post/query",
  async ({ title, tags }) => {
    return allPostQuerysApi({ title, tags });
  }
);
export const getLikeDislike = createAsyncThunk(
  "post/likeordislike",
  async (id) => {
    return likeDislikeApi(id);
  }
);
export const getComment = createAsyncThunk(
  "post/comment",
  async ({ postId, comment }) => {
    return getCommentApi({ postId, comment });
  }
);
export const postDelete = createAsyncThunk("post/delete", async (id) => {
  return postDeleteApi(id);
});

const initialState = {
  loading: false,
  postLoading: false,
  posts: [],
  post: null,
  error: "",
  message: "",
  postCount: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload.posts;
      state.postCount = payload.postCount;
      state.error = "";
    },
    [getAllPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getSinglePost.pending]: (state) => {
      state.loading = true;
    },
    [getSinglePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
      state.error = "";
    },
    [getSinglePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getAllPostsQuery.pending]: (state) => {
      state.loading = true;
    },
    [getAllPostsQuery.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.error = "";
    },
    [getAllPostsQuery.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [createPost.pending]: (state) => {
      state.postLoading = true;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.postLoading = false;
      state.message = payload;
      state.error = "";
    },
    [createPost.rejected]: (state, { payload }) => {
      state.postLoading = false;
      state.error = payload;
    },
    [getLikeDislike.pending]: (state) => {
      state.loading = true;
    },
    [getLikeDislike.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [getLikeDislike.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getComment.pending]: (state) => {
      state.loading = true;
    },
    [getComment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [getComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [postDelete.pending]: (state) => {
      state.loading = true;
    },
    [postDelete.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.error = "";
    },
    [postDelete.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default postSlice.reducer;
