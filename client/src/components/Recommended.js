import React from "react";
import { useNavigate } from "react-router-dom";

const Recommended = ({ post }) => {
  const navigate = useNavigate();

  const openPost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div
      onClick={() => openPost(post._id)}
      className="space-y-8 border p-4 rounded-lg"
    >
      <div className="space-y-2">
        <h2 className="text-lg">{post.title}</h2>
        <h3 className="text-sm">{post.owner.name}</h3>
        <p className="text-xs">
          {post.message.length >= 169 ? (
            <span>{post.message.slice(0, 169)}...</span>
          ) : (
            <span>{post.message}</span>
          )}
        </p>
      </div>
      <img
        className="h-[15rem] w-full object-cover"
        src={post.image.url}
        alt=""
      />
    </div>
  );
};

export default Recommended;
