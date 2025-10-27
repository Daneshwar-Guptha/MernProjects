import { useState, useEffect } from "react";
import { User, Mail, Lock, Edit3, X } from "lucide-react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");

  
  useEffect(() => {
  const token = Cookies.get("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token payload:", decoded); 
      setUser({
        username: decoded.username,
        email: decoded.email,
      });
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }
}, []);
  const handleEditClick = (field) => {
    setFieldToEdit(field);
    setNewValue(user[field]);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!newValue.trim()) {
      alert("Please enter a valid value!");
      return;
    }
    setUser((prev) => ({ ...prev, [fieldToEdit]: newValue }));
    setModalOpen(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 relative">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src="https://i.pravatar.cc/150?img=13"
          alt="Profile"
          className="w-28 h-28 rounded-full shadow-md border-2 border-blue-500"
        />
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">{user.username}</h2>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-8 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">
          Account Details
        </h3>

        <div className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="text-blue-500" size={22} />
              <div>
                <p className="text-gray-500 text-sm">Username</p>
                <p className="text-gray-800 font-medium">{user.username}</p>
              </div>
            </div>
            <button
              onClick={() => handleEditClick("username")}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Edit3 size={18} className="text-gray-500 hover:text-blue-600" />
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500" size={22} />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleEditClick("email")}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Edit3 size={18} className="text-gray-500 hover:text-blue-600" />
            </button>
          </div>

          {/* Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="text-blue-500" size={22} />
              <div>
                <p className="text-gray-500 text-sm">Password</p>
                <p className="text-gray-800 font-medium">************</p>
              </div>
            </div>
            <button
              onClick={() => handleEditClick("password")}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Edit3 size={18} className="text-gray-500 hover:text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative animate-fadeIn">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update {fieldToEdit.charAt(0).toUpperCase() + fieldToEdit.slice(1)}
            </h2>

            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={`Enter new ${fieldToEdit}`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
