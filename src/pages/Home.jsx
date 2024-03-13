import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row  text-white h-screen">
      <div className="bg-blue-500 text-white h-screen w-1/5 flex flex-col items-center justify-center py-0  p-10">
        <h1 className="text-4xl mb-8">
          Know Your{" "}
          <span className="font-bold">
            {" "}
            <br />
            Customer
          </span>
        </h1>
        <button className=" text-white border-2 border-white-500 px-6 py-3 rounded-lg hover:bg-blue-100 hover:text-blue-100 transition-colors duration-300">
          Continue with KYC
        </button>
      </div>
      <div>Testing </div>
    </div>
  );
};

export default Home;
