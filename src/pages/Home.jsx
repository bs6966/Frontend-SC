import React from "react";
import { Link } from "react-router-dom";
import Arrow from "../images/Group (3).svg";
import Question from "../images/Interrogation mark.svg";
import Comment from "../images/Questions.svg";
import form from "../images/Process.svg";
import Aadhar from "../images/aadhaar-card-7579588_1280 1 (1).png";
import Pan from "../images/pan-card 1.png";
import Doc from "../images/File error.svg";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row  text-white h-screen">
      <div className="bg-blue-500 text-white h-screen w-2/6 flex flex-col items-center justify-center py-0 ">
        <h1 className="text-5xl mb-8">
          Know Your{" "}
          <span className="font-bold">
            {" "}
            <br />
            Customer
          </span>
        </h1>
        <button className=" text-white border-2 border-white-500 px-6 py-3 rounded-lg hover:bg-blue-100 hover:text--100 transition-colors duration-300">
          <div className="flex flex-row gap-3">
            <Link to={"/kyc"}>Continue with KYC</Link>
            <img src={Arrow} />
          </div>
        </button>
      </div>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row pt-20 px-20 gap-10">
          <div className="flex flex-col gap-3 w-80">
            <img height="100" width="50" src={Question} />
            <h3 className="font-semibold text-blue-500">Q. What is KYC?</h3>
            <p className="text-black">
              <b>Know Your Customer </b>- KYC enables banks to know/ understand
              their customers and their financial dealings to be able to serve
              them better and manage its risks prudently.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-80">
            <img height="100" width="50" src={Comment} />
            <h3 className="font-semibold text-blue-500">Q. Why KYC?</h3>
            <p className="text-black">
              To establish the identity of the client : This means identifying
              the customer and verifying his/ her identity by using reliable,
              independent source documents, data or information.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-80">
            <img height="100" width="50" src={form} />
            <h3 className="font-semibold text-blue-500">
              Q. Is KYC mandatory?
            </h3>
            <p className="text-black">
              Yes. It is a regulatory* <br /> and legal** requirement.
              <br />
              <span className="text-xs">
                *Regulatory: In terms of the guidelines issued by the Reserve
                Bank of India (RBI) on 29th November 2004 on Know Your Customer
                [KYC] Standards <br />
                <br />
                **Legal: The Prevention of Money Laundering Act, 2002 (PMLA)
                which came into force from July, 2005
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-row px-20 gap-10">
          <div className="flex flex-col gap-3 w-80">
            <img height="100" width="50" src={Doc} />
            <h3 className="font-semibold text-blue-500">
              Q. Documents required for KYC?
            </h3>
            <div className="flex flex-row gap-10">
              <div className="flex flex-col">
                <p className="text-black">- Aadhaar Card</p>
                <img height="100" width="250" src={Aadhar} />
              </div>
              <div className="flex flex-col">
                <p className="text-black">- PAN Card</p>
                <img height="100" width="250" src={Pan} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
