import './index.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', marginTop: '64px' }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            marginLeft: '224px',
            overflowY: 'auto',
            background: 'var(--bg-base)',
            padding: '24px',
          }}
        >
          <Dashboard />
        </main>
      </div>
    </div>
  );
}