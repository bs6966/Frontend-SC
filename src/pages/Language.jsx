import React, { useState } from "react";
import { Link } from "react-router-dom";
import Arrow from "../images/Group (3).svg";

const Language = () => {
  const [language, setLanguage] = useState("English");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language }),
      });

      if (response.ok) {
        console.log("Language preference sent successfully");
        <Link to={"/"} />;
        // Redirect or handle success as needed
      } else {
        console.error("Failed to send language preference");
      }
    } catch (error) {
      console.error("Error sending language preference:", error);
    }
  };

  return (
    <div className="bg-blue-800 h-screen flex flex-col justify-center items-center text-white">
      <div className="text-5xl mb-10">
        Welcome <b>Customer</b>
      </div>
      <div className="mb-4 flex items-center">
        <p className="mr-4">Which language do you prefer?</p>
        <select
          className="border-2 border-blue-200 bg-blue-600 rounded-md text-white pl-4 pr-2 py-1"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
      <Link to={"/home"}>
        {" "}
        <div
          className="bg-white text-blue-600 font-bold rounded-lg pl-4 pr-4 py-2 mt-4 cursor-pointer"
          onClick={handleSubmit}
        >
          Continue
        </div>
      </Link>
    </div>
  );
};

export default Language;
