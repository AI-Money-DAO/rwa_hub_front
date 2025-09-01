import React from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = false }) => {
  const router = useRouter();

  // Don't show header/footer on auth pages
  const isAuthPage = router.pathname.startsWith('/auth');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {showSidebar && (
          <aside className="hidden lg:block w-64 bg-white border-r border-gray-200">
            <Sidebar />
          </aside>
        )}

        <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
