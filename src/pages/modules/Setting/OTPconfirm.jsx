import React, { useState , useRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import UserImg from '../../../assets/user.png';
import ShieldIcon from '../../../components/icons/SearchIcon';
import UserIcon from '../../../components/icons/UserIcon';
import ShowPasswordIcon from '../../../components/icons/ShowPasswordIcon';
import HidePasswordIcon from '../../../components/icons/HidePasswordIcon';

export default function OTPPage() {
  
  return (
    <div className="flex flex-col scroll-auto md:flex-row justify-between gap-6 p-6">
      {/* Left: Doctor Profile */}
      <div className="md:w-3/5">
        <div className="bg-[#FEEBE4] border border-[#FC437B] rounded-3xl py-6 w-full shadow-md">
          <div className="flex items-center px-6 border-[#FC437B] border-b-2 pb-4 mb-4">
            <UserIcon className="text-black mr-2" />
            <h2 className="text-md font-semibold">Doctor profile</h2>
          </div>
          <div className="flex flex-col md:px-12 p-4 items-center text-center">
            <img
              src={UserImg}
              alt="Doctor"
              className="w-24 h-24 rounded-full border-[#FC437B] border-2 mb-4"
            />
            <div className="gap-4 my-4 text-sm text-left w-full">
              <div className="bg-white p-3 rounded-2xl border-[#FC437B] border">
                <div className="flex p-2 bg-[#FEEBE4] border border-[#FC437B] rounded-2xl justify-between">
                  <div className="p-1">
                    <p className="text-s text-gray-600">Prefix Title</p>
                    <p className="font-medium py-2">Dr.</p>
                  </div>
                  <div className="p-1">
                    <p className="text-s text-gray-600">First name</p>
                    <p className="font-medium py-2">Harshal</p>
                  </div>
                  <div className="p-1">
                    <p className="text-s text-gray-600">Last name</p>
                    <p className="font-medium text-md py-2">Rewatkar</p>
                  </div>
                </div>
                <br />
                <div className="p-3 bg-[#FEEBE4] border border-[#FC437B] rounded-2xl">
                  <div className="p-1 pb-4 flex justify-between">
                    <div>
                      <p className="text-gray-600">Role</p>
                      <p className="font-medium py-1">Skin Specialist</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium py-1">+91 96578 58785</p>
                    </div>
                  </div>
                  <div className="p-1">
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">Dr.harshalrewatkar@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Account & Security */}
      <div className="md:px-8">
     {/* <PasswordChanger/> */}
     <Otp/>
      </div>
    </div>
  );
}


function PasswordChanger(){
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (   <div className="bg-[#FEEBE4] w-84 border border-[#FC437B] rounded-xl shadow-lg relative">
          <div className="flex p-6 items-center justify-center border-b">
            <ShieldIcon className="mx-4 text-black" />
            <h3 className="font-semibold text-md">Account & Security</h3>
          </div>

          <form className="space-y-4 text-left p-3">
            {/* Old Password Field */}
            <div className="relative">
              <label className="block text-sm mb-1">Old Password</label>
              <input
                type={showOld ? 'text' : 'password'}
                className="w-full border-[#FC437B] outline-none text-xl bg-white border rounded-md px-3 py-2 pr-10"
              />
              <div
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-[35px] cursor-pointer text-gray-600"
              >
                {showOld ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <label className="block text-sm mb-1">New Password</label>
              <input
                type={showNew ? 'text' : 'password'}
                className="w-full border-[#FC437B] outline-none text-xl bg-white border rounded-md px-3 py-2 pr-10"
              />
              <div
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-[35px] cursor-pointer text-gray-600"
              >
                {showNew ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            </div>

            <div className="text-blue-600 text-sm cursor-pointer">
              Forgot Password?
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-900 text-white py-3 rounded-xl text-sm font-semibold"
            >
              Done
            </button>
          </form>
        </div>)
}



function Otp ()  {
  const inputs = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    } else {
      e.target.value = '';
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6).split('');
    paste.forEach((char, i) => {
      if (inputs.current[i]) {
        inputs.current[i].value = char;
      }
    });
    inputs.current[Math.min(paste.length, 5)]?.focus();
  };

  return (
    <div className="bg-[#FEEBE4] w-84 p-8 py-12 border border-[#FC437B]  rounded-2xl shadow-2xl ">
      <p className="text-center text-gray-600 mb-4 font-medium text-base">
        Enter the OTP send on your <br /> mail id.
      </p>
      <h2 className="text-center text-black font-semibold mb-4 text-lg">Enter OTP</h2>

      <div className="flex justify-between mb-6 px-2" onPaste={handlePaste}>
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            maxLength="1"
            type="text"
            className="w-10 h-12 text-center border-2 border-pink-500 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            ref={(el) => (inputs.current[index] = el)}
            onChange={(e) => handleInput(e, index)}
          />
        ))}
      </div>

      <button className="w-full bg-indigo-900 text-white py-2 rounded-xl font-semibold hover:bg-indigo-800 transition duration-300">
        Confirm OTP
      </button>
    </div>
  );
};


