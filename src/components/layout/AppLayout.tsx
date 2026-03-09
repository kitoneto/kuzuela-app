import { type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar, BottomNav } from './Sidebar';
import { Footer } from './Footer';
import { useAuth } from '../../hooks/useAuth';

interface AppLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  showFooter?: boolean;
}

export function AppLayout({ children, showSidebar = true, showFooter = false }: AppLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        {user && showSidebar && <Sidebar />}
        <main className={`flex-1 ${user ? 'pb-20 lg:pb-0' : ''}`}>
          {children}
        </main>
      </div>
      {user && <BottomNav />}
      {showFooter && !user && <Footer />}
    </div>
  );
}
