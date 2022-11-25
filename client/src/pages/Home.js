import React from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import Posts from "../components/Posts";
import SubmitForm from "../components/SubmitForm";

const Home = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <div className="md:h-screen md:overflow-hidden bg-gradient-to-tr from-[#2A3B60] to-[#7D102E]">
      <div className="sticky top-0 bg-white z-[69]">
        <Nav />
      </div>
      <div className="flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 max-w-[110rem] mx-auto lg:gap-6">
        {/* Posts */}
        <div className="md:col-span-2 lg:col-span-3">
          <Posts posts={posts} />
        </div>
        <div className="col-span-1 mt-8 px-4">
          <SubmitForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
