import React from "react";
import Webcam from "react-webcam";
import Profile from "../components/Webcam";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-64 ">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const Kyc = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">
      <p className="text-gray-600 mb-8 absolute top-24 right-0 mr-6 mt-4">
        Facing any problem? Get help.
      </p>
      <div className="flex ">
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-max mr-5">
          <img src={""} alt={"title1"} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Card 1</h3>
            <p className="text-gray-700">This is the content of Card 1.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-max ml-5 ">
          <Profile />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="bg-white rounded-lg p-4 mr-4">
          <p className="text-gray-600">
            To establish the identity of the client: This means identifying the
            customer and verifying his/ her identity by using reliable,
            independent source documents, data or information.
          </p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-600">
            To establish the identity of the client: This means identifying the
            customer and verifying his/ her identity by using reliable,
            independent source documents, data or information.
          </p>
        </div>
      </div>
      <div className="flex">
        <button className=" border-2 bg-white hover:bg-gray-400 text-blue-600 border-blue-600 font-bold py-2 px-6 rounded mr-2">
          Go Back
        </button>
        <button className="bg-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-6  rounded">
          Confirm
        </button>
      </div>
    </main>
  );
};

export default Kyc;
