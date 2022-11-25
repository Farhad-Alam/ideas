import axios from "axios";
import { toast } from "react-toastify";

export const createPostApi = async (data) => {
  try {
    const res = await axios.post(
      `/api/v1/post/create`,
      {
        title: data.title,
        message: data.message,
        tags: data.tags,
        selectedFile: data.selectedFile,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.msg;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};
export const allPostsApi = async (page) => {
  try {
    const { data } = await axios.get(`/api/v1/posts?page=${page}`);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const singlePostApi = async (id) => {
  try {
    const { data } = await axios.get(`/api/v1/post/${id}`);

    return data.post;
  } catch (error) {
    console.log(error.message);
  }
};
export const allPostQuerysApi = async ({ title, tags }) => {
  try {
    const { data } = await axios.get(
      `/api/v1/post/search?title=${title ? title : null}&tags=${
        tags && tags.join(",")
      }`
    );
    return data.posts;
  } catch (error) {
    console.log(error.message);
  }
};
export const likeDislikeApi = async (id) => {
  try {
    const { data } = await axios.get(`/api/v1/post/likeUnlike/${id}`);

    return data.msg;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};
export const postDeleteApi = async (id) => {
  try {
    const { data } = await axios.delete(`/api/v1/post/${id}`);

    toast.success(data.msg);
    return data.msg;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};
export const getCommentApi = async ({ postId, comment }) => {
  try {
    const { data } = await axios.post(
      `/api/v1/post/comment/${postId}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success(data.msg);
    return data.msg;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};
