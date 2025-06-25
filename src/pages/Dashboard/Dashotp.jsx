import React, { useState, useRef } from 'react';

const OTPConfirmPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ''); // Only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleConfirmOTP = () => {
    alert(`Entered OTP: ${otp.join('')}`);
    // Add your OTP validation logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-2xl shadow-xl w-full max-w-md ">
        <div className="  p-4 rounded mb-4">
          <h2 className="text-xl font-bold text-center text-gray-900">
            Sparsh Skin Care Admin
          </h2>
          <p className="text-center text-sm text-gray-500 mt-1">
            Security Administration Access
          </p>
        </div>

        <div className=" p-4 rounded">
          <p className="text-center   text-gray-800 mb-4">Enter OTP</p>
          <div className="flex justify-between gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-10 h-12 text-center bg-white text-lg border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-300 outline-none"
              />
            ))}
          </div>

          <button
            onClick={handleConfirmOTP}
            className="w-full bg-indigo-900 text-white py-2 rounded-md font-semibold shadow hover:bg-indigo-800 transition duration-200"
          >
            Confirm OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPConfirmPage;
