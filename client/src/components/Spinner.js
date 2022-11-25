import React from "react";
import { Dna } from "react-loader-spinner";

const Spinner = ({ mess, isPost }) => {
  return (
    <div className={`flex justify-center items-center ${isPost && "h-[80vh]"}`}>
      <Dna type="Circles" color="#00BFFF" height={isPost ? 50 : 30} />
    </div>
  );
};

export default Spinner;
