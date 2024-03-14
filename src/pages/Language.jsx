import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Language = () => {
  const [languageIndex, setLanguageIndex] = useState(0);
  const languages = {
    welcome: ["Welcome Customer", "स्वागत ग्राहक"],
    prompt: ["Which language do you prefer?", "कौन सा भाषा पसंद करते हैं?"],
  };
  const [displayText, setDisplayText] = useState(languages.welcome[0]);
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const interval = setInterval(() => {
      setLanguageIndex(
        (prevIndex) => (prevIndex + 1) % languages.welcome.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text = languages.welcome[languageIndex];
    animateText(text, setDisplayText);
  }, [languageIndex]);

  const animateText = (text, setText) => {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        newText += text[i];
        setText(newText);
      }, 200 * i);
    }
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
        {displayText && <b>{displayText}</b>}
      </div>
      <div className="mb-4 flex items-center">
        <p className="mr-4">{languages.prompt[languageIndex]}</p>
        <select
          className="border-2 border-blue-200 bg-blue-600 rounded-md text-white pl-4 pr-2 py-1"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="English">English</option>
          <option value="Hindi">हिंदी</option>
        </select>
      </div>
      <Link to={"/home"}>
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
