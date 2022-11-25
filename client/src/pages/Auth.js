import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, userLogin, userRegister } from "../redux/slices/userSlice";
import Spinner from "../components/Spinner";

const Auth = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const imageRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUser = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.email && user.password) {
      if (isAuth) {
        await dispatch(userLogin(user));
        await dispatch(loadUser());
      } else {
        await dispatch(userRegister({ user, selectedFile }));
        await dispatch(loadUser());
      }
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readEvent) => {
      setSelectedFile(readEvent.target.result);
    };
  };

  return (
    <div className="bg-[rgba(0,0,0,0.4)] h-screen w-screen flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-2/5 lg:w-1/5 h-[38rem] md:h-fit rounded-xl p-10">
        <div className="w-full h-full">
          <h1 className="text-2xl font-Aboreto text-center font-bold">
            {isAuth ? "Log IN" : "Register"}
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center h-full space-y-10 md:space-y-12 md:my-8"
          >
            {!isAuth && (
              <div>
                <img
                  src={
                    selectedFile
                      ? selectedFile
                      : "https://i.ytimg.com/vi/FCgACOkmwtg/maxresdefault.jpg"
                  }
                  className="w-14 h-14 border-[2px] border-red-400 p-[1.5px] rounded-full object-cover"
                  onClick={() => imageRef.current.click()}
                  alt=""
                />
                <input
                  ref={imageRef}
                  type="file"
                  onChange={handleFile}
                  hidden
                />
              </div>
            )}

            {!isAuth && (
              <input
                type="name"
                name="name"
                value={user.name}
                className="formInput"
                placeholder="Enter ur Name"
                onChange={handleUser}
              />
            )}
            <input
              type="email"
              name="email"
              value={user.email}
              className="formInput"
              placeholder="Enter ur Email"
              onChange={handleUser}
            />
            <input
              type="password"
              name="password"
              value={user.password}
              className="formInput"
              placeholder="Enter ur Password"
              onChange={handleUser}
            />
            <button
              type="submit"
              disabled={!user.email}
              className="px-4 py-2 bg-slate-400 disabled:cursor-not-allowed text-white tracking-wide rounded-md font-semibold font-Sans anim"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
            <span
              onClick={() => setIsAuth(!isAuth)}
              className="text-center block border-b py-1 anim text-xs font-Aboreto font-bold tracking-wider text-yellow-700"
            >
              {!isAuth
                ? "Already Registered?? LogIn here.."
                : "Not Registered?? Click here.."}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
