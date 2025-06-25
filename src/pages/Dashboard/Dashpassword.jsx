import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      alert('Password reset successful!');
      // Add API logic here
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-gradient-to-br from-orange-100 to-pink-100 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-900">
          Sparsh Skin Care Admin
        </h2>
        <p className="text-center text-sm text-gray-500 mt-1">
          Security Administration Access
        </p>

        <div className="mt-6">
          <label className="block text-sm  text-start font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="mt-4 relative">
          <label className="block  text-start text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 bg-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-indigo-900 text-white py-2 rounded-md font-semibold shadow hover:bg-indigo-800 transition duration-200"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
