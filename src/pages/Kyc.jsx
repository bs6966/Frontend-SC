import React, { useState } from "react";
import AI from "../images/WhatsApp Image 2024-03-13 at 6.14.10 PM.jpeg";
import Webcam from "react-webcam";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-max ">
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

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    panCardNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="tel"
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="Date of Birth"
        className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="panCardNumber"
        value={formData.panCardNumber}
        onChange={handleChange}
        placeholder="PAN Card Number"
        className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
      />
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded"
        rows="4"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const Kyc = () => {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, [webcamRef]);

  const savePicture = async (picture) => {
    const formData = new FormData();
    formData.append("picture", picture.split(",")[1]);

    try {
      const response = await fetch("/api/save-picture", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Picture saved successfully");
      } else {
        console.error("Failed to save picture");
      }
    } catch (error) {
      console.error("Error saving picture:", error);
    }
  };
  const [showForm, setShowForm] = useState(false);
  const handleConfirmClick = () => {
    setShowForm(true);
    savePicture(picture);
  };

  const handlePhoto = (e) => {
    e.preventDefault();
    if (picture !== "") {
      // If there's already a captured picture, reset it (retake)
      setPicture("");
    } else {
      // If no picture is captured yet, capture a new one
      capture();
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">
      <p className="text-gray-600 mb-8 absolute top-24 right-0 mr-6 mt-4">
        Facing any problem? Get help.
      </p>
      <div className="flex mb-1">
        <div
          className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-max mr-10"
          style={{ height: 400, width: 400 }}
        >
          <img src={AI} alt={"title1"} className="w-full h-full object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Card 1</h3>
          </div>
        </div>
        {showForm ? (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-max ml-10"
            style={{ width: 400 }}
          >
            {<Form />}
          </div>
        ) : (
          <div
            className="border-4 border-blue-500 bg-white rounded-lg shadow-md overflow-hidden w-64 h-max ml-5"
            style={{ height: 400, width: 400 }}
          >
            <div className="flex flex-col items-center justify-center">
              <div>
                {picture === "" ? (
                  <Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    width={400}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img src={picture} alt="Captured" />
                )}
              </div>
              <div className="">
                {picture !== "" ? (
                  <div className="flex flex-row gap-10 mt-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPicture("");
                      }}
                      className="btn btn-primary"
                    >
                      Retake
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        savePicture(picture);
                      }}
                      className="btn btn-success"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      capture();
                    }}
                    className="btn btn-danger"
                  >
                    Capture
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-2">
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
        {showForm ? (
          <div></div>
        ) : (
          <button
            className="border-2 bg-white hover:bg-gray-400 text-blue-600 border-blue-600 font-bold py-2 px-6 rounded mr-2"
            onClick={handlePhoto}
          >
            {picture !== "" ? "Retake" : "Take Photo"}
          </button>
        )}
        <button
          className="border-2 bg-white hover:bg-gray-400 text-blue-600 border-blue-600 font-bold py-2 px-6 rounded mr-2"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
      </div>
    </main>
  );
};

export default Kyc;
