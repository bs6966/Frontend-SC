import React from "react";
import AI from "../images/WhatsApp Image 2024-03-13 at 6.14.10 PM.jpeg";
const Occupation = () => {
  return (
    <div className="text-black flex flex-col items-center justify-center h-screen">
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-max mr-10"
        style={{ height: 400, width: 400 }}
      >
        <img src={AI} alt={"title1"} className="w-full h-full object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Card 1</h3>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 mr-4 mt-3">
        <p className="text-gray-600">
          To establish the identity of the client: This means identifying the
          customer and verifying his/ her identity by using reliable,
          independent source documents, data or information.
        </p>
      </div>
    </div>
  );
};

export default Occupation;
