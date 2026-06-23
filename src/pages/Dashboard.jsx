import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ChartSection from "../components/ChartSection";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div>
      <Sidebar />

      <div>
        <Navbar />

        <h1>Welcome Back, Abhishek 👋</h1>

        <div>
          <StatCard title="Total Trades" value={1240} />
          <StatCard title="Profit" value={5600} />
          <StatCard title="Active Bots" value={12} />
          <StatCard title="Win Rate" value={78} />
        </div>

        <ChartSection />

        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;