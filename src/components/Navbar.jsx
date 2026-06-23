import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaMoon,
} from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b">
      
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back, Abhishek 👋
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-lg w-96">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search stocks, strategies..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        
        {/* Dark Mode */}
        <button className="p-2 rounded-lg hover:bg-slate-100 transition">
          <FaMoon className="text-xl text-slate-700" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer text-slate-700 hover:text-blue-600 transition" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            73
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-3xl text-slate-700" />

          <div className="hidden md:block">
            <p className="font-semibold text-slate-800">
              Abhishek Shah
            </p>
            <p className="text-xs text-gray-500">
              Web Developer Intern
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;