import { motion } from "framer-motion";
import {
  FaChartLine,
  FaRobot,
  FaBook,
  FaCog,
  FaHome,
} from "react-icons/fa";

function Sidebar() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-64 bg-slate-900 text-white p-6 shadow-xl"
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 text-center">
        QuantMentor
      </h1>

      {/* Menu */}
      <ul className="space-y-4">
        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300">
          <FaHome />
          Dashboard
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300">
          <FaChartLine />
          Market Analysis
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300">
          <FaRobot />
          AI Strategies
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300">
          <FaBook />
          Trade Journal
        </li>

        <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:text-cyan-400 transition-all duration-300">
          <FaCog />
          Settings
        </li>
      </ul>

      {/* Bottom User Section */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="font-semibold">Abhishek Shah</p>
          <p className="text-sm text-gray-400">
            Web Developer Intern
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;