import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { getComment, getSinglePost } from "../redux/slices/postSlice";
import { FaArrowCircleRight, FaCommentSlash } from "react-icons/fa";
import Recommended from "../components/Recommended";

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { posts, post, loading } = useSelector((state) => state.post);
  const [comment, setComment] = useState();
  const postId = post?._id;

  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(getComment({ postId, comment }));
    setComment("");
  };
  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, comment, id]);

  const recommendedPost = posts.filter(({ _id }) => _id !== post?._id);
  return (
    <div className="">
      <Nav />

      <div className="grid md:grid-cols-2 max-w-7xl mx-auto p-4 md:p-6 gap-10">
        {/* Left */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-Lato tracking-wide mb-2">
              {post?.title}
            </h1>
            <div className="flex space-x-2 text-gray-400 font-[500] font-Raleway">
              {post?.tags.map((item, index) => (
                <span key={index} className="text-sm">
                  #{item}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-700 font-Sans">{post?.message}</p>
          <h3 className="font-Sans ">
            Creted By : <span>{post?.owner.name}</span>
          </h3>
          <span className="text-sm tracking-wide">
            {moment(post?.createdAt).fromNow()}
          </span>
          {/* Comment */}
          <div className="bg-gray-100 shadow-lg rounded-md p-2">
            {post?.comments.length === 0 ? (
              <div className="flex flex-col justify-center items-center my-8 text-gray-500">
                <FaCommentSlash size={30} />
                <h1 className="text-xl font-Sans ">No Comments Yet !!</h1>
              </div>
            ) : (
              <div className=" space-y-4 py-4 overflow-auto h-[10rem] grid place-items-center">
                {post?.comments.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white flex space-x-4 w-fit rounded-xl px-4 py-1 shadow-lg"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover "
                      src={item.user.avatar.url}
                      alt=""
                    />
                    <div className="">
                      <h1 className="text-gray-700 font-Lato">
                        {item.user.name}
                      </h1>
                      <p className="text-sm tracking-wide font-Sans text-gray-500">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <form
              onSubmit={handleComment}
              className="flex items-center space-x-4 mt-4 justify-center mb-4"
            >
              <input
                onChange={(e) => setComment(e.target.value)}
                className=" bg-gray-300 tracking-wide py-2 px-4 text-sm outline-none rounded-md"
                placeholder="Enter ur Comment"
                type="text"
              />
              <button
                type="submit"
                disabled={!comment}
                className="disabled:cursor-not-allowed text-xl border border-black rounded-full anim w-8 h-8 flex justify-center items-center"
              >
                <FaArrowCircleRight />
              </button>
            </form>
          </div>
        </div>
        {/* Right */}
        <div className="">
          <img
            className="rounded-xl h-[30rem] object-cover shadow-lg w-full"
            src={post?.image.url}
            alt=""
          />
        </div>
      </div>
      {/* Recommended Posts */}
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="mb-10">You might also like : </h1>
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-8">
          {recommendedPost.map((item) => (
            <Recommended key={item._id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
