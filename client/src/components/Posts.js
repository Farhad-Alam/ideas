import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Spinner from "./Spinner";

const Posts = ({ posts }) => {
  const { loading } = useSelector((state) => state.post);
  return (
    <div className="">
      {posts.length > 0 ? (
        loading ? (
          <Spinner isPost={true} />
        ) : (
          <div className="p-4 md:p-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 md:scrollbar-thin md:scrollbar-thumb-black md:overflow-auto md:h-[93vh] md:mb-[150rem] py-10">
            {posts.map((item) => (
              <Post key={item._id} post={item} />
            ))}
          </div>
        )
      ) : (
        <div className="">
          <h1 className="text-3xl font-Sans">No Posts Found..</h1>
        </div>
      )}
    </div>
  );
};

export default Posts;
