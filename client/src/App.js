import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/slices/userSlice";
import { getAllPosts } from "./redux/slices/postSlice";
import SinglePost from "./pages/SinglePost";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPosts());
      await dispatch(loadUser());
    };
    fetchData();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
        />
        <Route exact path="/post/:id" element={<SinglePost />} />
        <Route
          exact
          path="/auth"
          element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
