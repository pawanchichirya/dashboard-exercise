import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle responsive sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 992 && sidebarOpen) {
        setSidebarOpen(false);
      } else if (window.innerWidth >= 992 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-dark text-light' : 'bg-light'} min-vh-100`}>
      {sidebarOpen && <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />}
      <Header open={sidebarOpen} onToggleSidebar={handleSidebarToggle} />
      
      <main 
        className="overflow-hidden"
        style={{ 
          marginLeft: sidebarOpen ? '240px' : '0',
          padding: '20px',
          marginTop: '56px',
          transition: 'margin-left 0.2s',
          width: sidebarOpen ? 'calc(100% - 240px)' : '100%'
        }}
      >
        <Container fluid className="py-3">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default Layout; 