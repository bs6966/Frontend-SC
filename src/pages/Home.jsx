import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-3xl">
      <Link to={"/kyc"}>Click here</Link>
    </div>
  );
};

export default Home;
