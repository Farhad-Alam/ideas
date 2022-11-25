import axios from "axios";
import { toast } from "react-toastify";

export const userRegisterApi = async (user, selectedFile) => {
  try {
    const { data } = await axios.post(
      `/api/v1/user/register`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: selectedFile,
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
    toast.error(error.response.data.msg);
  }
};
export const userLoginApi = async (user) => {
  try {
    const { data } = await axios.post(
      `/api/v1/user/login`,

      {
        email: user.email,
        password: user.password,
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
    toast.error(error.response.data.msg);
  }
};
export const userLogOutApi = async () => {
  try {
    const { data } = await axios.get(`/api/v1/user/logout`);
    toast.success(data.msg);
    return data.msg;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
export const userProfileApi = async (rejectWithValue) => {
  try {
    const { data } = await axios.get(`/api/v1/user`);

    return data.user;
  } catch (error) {
    toast.error(error.response.data.msg);
    return rejectWithValue(error.response.data.msg);
  }
};
