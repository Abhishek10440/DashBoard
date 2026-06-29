import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0a0d1a' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', marginTop: 56 }}>
        <Sidebar />
        <main style={{
          flex: 1,
          marginLeft: 208,
          overflowY: 'auto',
          padding: '28px 32px',
          background: '#0a0d1a',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}