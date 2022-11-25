import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { showModal, userLogOut } from "../redux/slices/userSlice";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ img, name, email, modal }) => {
  const dispatch = useDispatch();

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(showModal(false))}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex flex-col justify-center items-center space-y-2 absolute right-2 xl:right-[21rem] top-[4.8rem]  rounded-md w-fit bg-white p-4">
              <img
                className=" border-[2px] border-gray-400 p-[1.5px] w-12 h-12 rounded-full object-cover"
                src={img}
                alt=""
              />
              <h1 className="font-Aboreto font-bold">{name}</h1>
              <p className="text-sm font-Lato tracking-wide">
                Your Email : {email}{" "}
              </p>
              <div className="">
                <button
                  onClick={() => dispatch(userLogOut())}
                  className="mt-4 text-white text-sm  font-Lato tracking-wider bg-gradient-to-br from-[#8565c4] to-[#e0c0f7] rounded-tl-xl rounded-br-xl px-4 py-2 "
                >
                  Sign Out
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

// <div className="flex flex-col justify-center items-center space-y-2 absolute right-2 top-[4.8rem] rounded-md w-fit bg-white p-4">
//       <img
//         className=" border-[2px] border-gray-400 p-[1.5px] w-12 h-12 rounded-full object-cover"
//         src={img}
//         alt=""
//       />
//       <h1 className="font-Aboreto font-bold">{name}</h1>
//       <p className="text-sm font-Lato tracking-wide">Your Email : {email} </p>
//       <div className="">
//         <button
//           onClick={() => dispatch(userLogOut())}
//           className="mt-4 text-white text-sm  font-Lato tracking-wider bg-gradient-to-br from-[#8565c4] to-[#e0c0f7] rounded-tl-xl rounded-br-xl px-4 py-2 "
//         >
//           Sign Out
//         </button>
//       </div>
//     </div>
