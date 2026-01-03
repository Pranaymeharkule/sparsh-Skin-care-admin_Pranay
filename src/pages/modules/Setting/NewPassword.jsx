import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import UserImg from '../../../assets/user.png';
import ShieldIcon from '../../../components/icons/SearchIcon';
import UserIcon from '../../../components/icons/UserIcon';
import ShowPasswordIcon from '../../../components/icons/ShowPasswordIcon';
import HidePasswordIcon from '../../../components/icons/HidePasswordIcon';
import { useNavigate } from 'react-router-dom';

export default function NewPassword() {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="flex flex-col md:flex-row justify-between gap-8">
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
        <div className="md:px-8   sm:px-50">
          {/* <PasswordChanger/> */}
          <PasswordResetForm />
        </div>
      </div>
    </div>



  );
}



function PasswordResetForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle password reset logic here
    alert("Password changed successfully!");
  };
    

  const handleGetOtp = () => {
    // Simulate sending OTP...
    // Navigate to enter OTP page
    navigate('/newpassword');
  };

  return (
    <div className="bg-[#FEEBE4] w-84 p-8 py-12 border border-[#FC437B]   rounded-2xl shadow-2xl">
      <h2 className="text-gray-600 font-medium text-lg mb-6">
        Please enter the New Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* New Password */}
        <div className="relative">
          <label className="font-semibold text-sm">New Password</label>
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border-2 border-pink-500 rounded-xl focus:outline-none"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-600"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="font-semibold text-sm">Confirm Password</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border-2 border-pink-500 rounded-xl focus:outline-none"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Submit Button */}
        <button  onClick={handleGetOtp}
         
          className="w-full bg-[#1E1874] text-white py-3 mt-2 rounded-xl font-semibold hover:opacity-90"
        >
          Save
        </button>
      </form>
    </div>
  );
}
