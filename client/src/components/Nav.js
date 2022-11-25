import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPosts } from "../redux/slices/postSlice";
import { showModal } from "../redux/slices/userSlice";
import Modal from "./Modal";

const Nav = () => {
  const dispatch = useDispatch();
  const { user, modal } = useSelector((state) => state.user);

  return (
    <div className="">
      <div className="shadow-md bg-[#801032]">
        <div className=" max-w-7xl mx-auto flex justify-between items-center p-4 md:px-6">
          {/* Left */}
          <Link
            onClick={() => dispatch(getAllPosts())}
            to="/"
            className="text-white font-Aboreto text-xl md:text-2xl font-semibold "
          >
            <h1 cla>Ideas</h1>
          </Link>
          {/* Right */}
          <div className="flex items-center space-x-4">
            <img
              className="shadow-md w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-[2px] border-gray-400 p-[1.5px] "
              src={user?.avatar?.url}
              alt=""
            />
            <div
              onClick={() => dispatch(showModal(true))}
              className="flex items-center anim gap-2 text-sm bg-gray-100 py-2 px-3 rounded-md shadow-md"
            >
              <h2 className="font-Sans ">{user?.name}</h2>
              <AiOutlineArrowDown />
            </div>
          </div>
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        {modal && (
          <Modal
            img={user?.avatar?.url}
            name={user?.name}
            email={user?.email}
            modal={modal}
          />
        )}
      </div>
    </div>
  );
};

export default Nav;
