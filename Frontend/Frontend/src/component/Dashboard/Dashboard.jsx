import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Home, User, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);



  useEffect(() => {

    const fetchDetails = async () => {
      try {
        const decode = await axios.get("http://localhost:2000/profile/view",{
          withCredentials:true
        });
        setUserData({
          username: decode.data.username,
          email: decode.data.email,
        });
      } catch (error) { 
        console.log(error.message);
      }

    }
    fetchDetails();
}, []);

  const handleLogout = async() => {
    try{
      const response = await axios.get("http://localhost:2000/logout",{
        withCredentials:true
      });
      navigate("/");
    }catch(error){
      console.log(error.message)
    }
};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 🔹 Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* 👤 Left: User Info */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-10 h-10 rounded-full border shadow-sm"
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {userData?.username || "Loading..."}
              </p>
              <p className="text-xs text-gray-500">{userData?.email}</p>
            </div>
          </div>

          {/* 🔗 Middle: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-2 transition ${isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-500"
                }`
              }
            >
              <Home size={18} />
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 transition ${isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-500"
                }`
              }
            >
              <User size={18} />
              Profile
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 transition ${isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-500"
                }`
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>
          </nav>

          {/* 🚪 Right: Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition shadow"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 Page Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
