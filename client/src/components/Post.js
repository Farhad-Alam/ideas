import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getAllPosts,
  getLikeDislike,
  postDelete,
} from "../redux/slices/postSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(post);

  const handleLike = async (id) => {
    await dispatch(getLikeDislike(id));
    await dispatch(getAllPosts());
    setIsLike(!isLike);
  };

  useEffect(() => {
    const alreadyLIked = post.likes.filter((item) => item === user?._id);

    if (alreadyLIked.length > 0) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, user?._id]);

  const deletePost = async (id) => {
    alert("Your Post will be Deleted");
    await dispatch(postDelete(id));
    await dispatch(getAllPosts());
  };

  return (
    <div
      onClick={() => navigate(`/post/${post._id}`)}
      className="shadow-lg rounded-xl bg-white h-[30.5rem]"
    >
      {/* Top */}
      <div className="relative cursor-pointer">
        <img
          src={post.image.url}
          alt=""
          className="rounded-t-xl h-[15rem] md:h-[13rem] w-full object-cover"
        />
        <div className="absolute top-4 left-4 text-gray-100 z-10 font-Lato space-y-1">
          <h1 className="text-white font-Raleway capitalize tracking-wide text-lg">
            {post.owner.name}
          </h1>
          <p className="text-sm">{moment(post.createdAt).fromNow()}</p>
        </div>
        <div className="rounded-t-xl absolute top-0 w-full h-full bg-[rgba(0,0,0,0.3)]" />
      </div>
      {/* Bottom */}
      <div className="p-4 space-y-4 md:space-y-4">
        <div className="flex flex-wrap ">
          {post.tags.map((item) => (
            <h2
              className="mr-2 mt-2 text-[11px] font-Aboreto tracking-wider text-gray-500 font-bold"
              key={item._id}
            >
              #{item}
            </h2>
          ))}
        </div>
        <div className="space-y-4 md:space-y-6">
          <h1 className="font-Aboreto font-bold text-lg md:text-xl tracking-wide ">
            {post.title}
          </h1>
          <p className="font-Sans text-sm tracking-wide text-gray-600">
            {post.message.length >= 80 ? (
              <span>{post.message.slice(0, 80)}...</span>
            ) : (
              <span>{post.message}</span>
            )}
          </p>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-between items-center"
        >
          <div className="flex items-center space-x-2 font-Lato">
            <button onClick={() => handleLike(post._id)}>
              {isLike ? (
                <AiFillLike className="text-2xl text-purple-800" />
              ) : (
                <AiFillLike className="text-2xl" />
              )}
            </button>
            <p className="text-sm tracking-wide ">
              <span>{post.likes.length}</span> Like
            </p>
          </div>
          <button
            onClick={() => deletePost(post._id)}
            className="text-2xl text-red-800 anim"
          >
            {user._id === post.owner._id && <MdDelete />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
