import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-h-screen lg:pl-[18.5rem]">
        <Navbar onMenuClick={() => setSidebarOpen((current) => !current)} />
        <main className="px-4 pb-8 pt-6 sm:px-6 lg:px-8 xl:px-10">{children}</main>
        <div className="px-4 pb-8 sm:px-6 lg:px-8 xl:px-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}
