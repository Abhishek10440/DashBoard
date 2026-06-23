import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ChartSection from "./components/ChartSection";


function App() {
  return (
    <>
    <ChartSection />
    <Navbar />
    <Sidebar />
    <Footer />
    <StatCard title="Total Trades" value={1240} />
    <StatCard title="Profit" value={5600} />
    <StatCard title="Active Bots" value={12} />
    <StatCard title="Win Rate" value={78} />

      <Dashboard />
    </>
  );
}

export default App;