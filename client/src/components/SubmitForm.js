import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getAllPosts,
  getAllPostsQuery,
} from "../redux/slices/postSlice";
import { AiFillCamera } from "react-icons/ai";
import Spinner from "./Spinner";
import { AiOutlineClose } from "react-icons/ai";
import { Pagination } from "@mui/material";

const SubmitForm = () => {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState();
  const [tags, setTags] = useState([]);
  const { postLoading, loading, postCount } = useSelector(
    (state) => state.post
  );

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readEvent) => {
      setFormData({ ...formData, selectedFile: readEvent.target.result });
    };
  };

  const handleForm = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (title || tags) {
      await dispatch(getAllPostsQuery({ title, tags }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      await dispatch(createPost(formData));
      await dispatch(getAllPosts());
    }
    setFormData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleTags = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;

    if (!value.trim()) return;
    setTags([...tags, value]);
  };

  const handleDelete = (i) => {
    const filterTags = tags.filter((item) => item !== i);
    setTags(filterTags);
  };

  useEffect(() => {
    dispatch(getAllPosts(page));
  }, [page, dispatch]);

  return (
    <div className="space-y-6 md:space-y-10 ">
      {/* Top */}
      <form
        onSubmit={handleSearch}
        className="bg-white flex flex-col space-y-6 border border-gray-600 rounded-lg shadow-2xl p-3 py-5"
      >
        <input
          type="text"
          placeholder="Search by Title"
          className="searchInput"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex items-center flex-wrap  border border-black py-2 px-4">
          {tags.map((item, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 capitalize mr-2 mt-2 text-xs bg-slate-400 py-1 px-3 w-fit rounded-full font-Sans tracking-wide text-gray-800"
            >
              <span>{item}</span>
              <span>
                <AiOutlineClose onClick={() => handleDelete(item)} />
              </span>
            </div>
          ))}
          <input
            onKeyDown={handleTags}
            type="text"
            className="outline-none text-sm tracking-wide"
            placeholder="Enter ur Tags"
          />
        </div>

        <button
          type="submit"
          disabled={tags.length === 0 && !title}
          className="disabled:cursor-not-allowed py-2 px-4 bg-blue-800 anim tracking-wide rounded-lg text-white font-Sans"
        >
          Search
        </button>
      </form>

      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col space-y-6 border border-gray-600 rounded-lg shadow-2xl p-3 py-5"
      >
        <div className="flex justify-center items-center anim">
          {formData.selectedFile ? (
            <img
              src={formData.selectedFile}
              className="w-14 h-14 rounded-md object-cover border-2 border-gray-400 p-[1.5px] "
              alt=""
            />
          ) : (
            <AiFillCamera
              onClick={() => imgRef.current.click()}
              size={35}
              className="text-red-500 border border-gray-500 rounded-full p-[5px]"
            />
          )}
        </div>
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Enter ur Title"
          className="searchInput"
          onChange={handleForm}
        />
        <textarea
          type="text"
          name="message"
          value={formData.message}
          placeholder="Enter ur Message"
          className="searchInput"
          onChange={handleForm}
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          placeholder="Enter ur Tags ((Separate using Comma))"
          className="searchInput placeholder:text-xs"
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value.split(",") })
          }
        />
        <input type="file" ref={imgRef} onChange={handleImg} hidden />
        <button
          type="submit"
          disabled={
            !formData.title ||
            !formData.message ||
            !formData.tags ||
            !formData.selectedFile
          }
          className="disabled:cursor-not-allowed py-2 px-4 bg-blue-800 anim tracking-wide rounded-lg text-white font-Sans"
        >
          {postLoading ? <Spinner /> : "Submit"}
        </button>
      </form>
      {/* Pagination */}
      <div className="bg-white w-fit py-2 px-2 lg:px-4 rounded-lg mx-auto">
        <Pagination
          page={page}
          onChange={(event, value) => {
            setPage(value);
          }}
          color="secondary"
          count={Math.ceil(postCount / 8)}
          boundaryCount={0}
        />
      </div>
    </div>
  );
};

export default SubmitForm;
