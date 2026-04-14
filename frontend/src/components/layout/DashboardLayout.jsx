import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell-gradient flex min-h-screen bg-transparent">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen((current) => !current)} />
        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
        <div className="px-4 sm:px-6 lg:px-8"><Footer /></div>
      </div>
    </div>
  );
}
