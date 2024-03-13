import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const Profile = () => {
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

  return (
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
          <div className="flex flex-row gap-10">
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
  );
};

export default Profile;
