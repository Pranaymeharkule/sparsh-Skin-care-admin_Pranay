import React, { useEffect, useState } from "react";
import UserImg from "../../../assets/user.png";
import ShieldIcon from "../../../components/icons/SheildIcon";
import UserIcon from "../../../components/icons/UserIcon";
import ShowPasswordIcon from "../../../components/icons/ShowPasswordIcon";
import HidePasswordIcon from "../../../components/icons/HidePasswordIcon";

import useFetch from "../../../hooks/useFetch";
import conf from "../../../config";
import { toast } from "react-toastify";

export default function DashboardSetting() {
  const [profile, setProfile] = useState(null);
  const [fetchData] = useFetch();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/profile`,
      });

      if (res.success) {
        setProfile(res.data);
      }
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  if (!profile) return null;

  return (
    <div className="flex flex-col scroll-auto md:flex-row justify-between gap-6 p-6">
      {/* Left: Doctor Profile */}
      <div className="md:w-3/5">
        <div className="bg-[#FEEBE4] border border-[#FC437B] rounded-3xl py-6 w-full shadow-md">
          <div className="flex items-center px-6 border-[#FC437B] border-b-2 pb-4 mb-4">
            <UserIcon className="text-black mr-2" />
            <h2 className="text-md font-semibold">Doctorrtrty profile</h2>
          </div>

          <div className="flex flex-col md:px-12 p-4 items-center text-center">
            <img
              src={profile.profileImage || UserImg}
              alt="Doctor"
              className="w-24 h-24 rounded-full border-[#FC437B] border-2 mb-4"
            />

            <div className="gap-4 my-4 text-sm text-left w-full">
              <div className="bg-white p-3 rounded-2xl border-[#FC437B] border">
                <div className="flex p-2 bg-[#FEEBE4] border border-[#FC437B] rounded-2xl justify-between">
                  <div className="p-1">
                    <p className="text-s text-gray-600">Prefix Title</p>
                    <p className="font-medium py-2">{profile.prefix}</p>
                  </div>
                  <div className="p-1">
                    <p className="text-s text-gray-600">First ewewername</p>
                    <p className="font-medium py-2">{profile.firstName}</p>
                  </div>
                  <div className="p-1">
                    <p className="text-s text-gray-600">Last name</p>
                    <p className="font-medium text-md py-2">
                      {profile.lastName}
                    </p>
                  </div>
                </div>

                <br />

                <div className="p-3 bg-[#FEEBE4] border border-[#FC437B] rounded-2xl">
                  <div className="p-1 pb-4 flex justify-between">
                    <div>
                      <p className="text-gray-600">Role</p>
                      <p className="font-medium py-1">{profile.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium py-1">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="p-1">
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Account & Security */}
      <div className="md:px-8">
        <PasswordOtp email={profile.email} />
      </div>
    </div>
  );
}

/* ================= PASSWORD CHANGE (OPTIONAL – UI UNCHANGED) ================= */

function PasswordChanger() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="bg-[#FEEBE4] w-84 border border-[#FC437B] rounded-xl shadow-lg relative">
      <div className="flex p-6 items-center justify-center border-b">
        <ShieldIcon className="mx-4 text-black" />
        <h3 className="font-semibold text-md">Account & Security</h3>
      </div>

      <form className="space-y-4 text-left p-3">
        <div className="relative">
          <label className="block text-sm mb-1">Old Password</label>
          <input
            type={showOld ? "text" : "password"}
            className="w-full border-[#FC437B] outline-none text-xl bg-white border rounded-md px-3 py-2 pr-10"
          />
          <div
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3 top-[35px] cursor-pointer"
          >
            {showOld ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm mb-1">New Password</label>
          <input
            type={showNew ? "text" : "password"}
            className="w-full border-[#FC437B] outline-none text-xl bg-white border rounded-md px-3 py-2 pr-10"
          />
          <div
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-[35px] cursor-pointer"
          >
            {showNew ? <HidePasswordIcon /> : <ShowPasswordIcon />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-900 text-white py-3 rounded-xl text-sm font-semibold"
        >
          Done
        </button>
      </form>
    </div>
  );
}

/* ================= OTP SECTION ================= */

function PasswordOtp({ email }) {
  const [fetchData] = useFetch();

  const handleGetOtp = async () => {
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/profile/send-otp`,
        data: { email },
      });

      if (res.success) {
        toast.success("OTP sent to your email");
      }
    } catch {
      toast.error("Failed to send OTP");
    }
  };

  return (
    <div className="bg-[#FEEBE4] w-84 p-8 py-12 border border-[#FC437B] rounded-2xl shadow-2xl">
      <div className="p-2">
        <div className="text-center py-4 font-medium text-gray-500">
          <h1>Enter your mail id to get the OTP</h1>
        </div>

        <div className="text-left py-2">
          <label className="font-medium">Email</label>
          <input
            value={email}
            disabled
            className="w-full border-[#FC437B] bg-white border rounded-md px-3 py-2"
          />
        </div>

        <button
          onClick={handleGetOtp}
          className="text-center text-white p-3 my-2 rounded-xl w-full bg-[#1E1874]"
        >
          Get OTP
        </button>
      </div>
    </div>
  );
}
