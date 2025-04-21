import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Form } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { AppText } from '../../utils/text';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  // If sidebar is closed, don't render anything
  if (!open) {
    return null;
  }
  
  return (
    <div 
      className={`${isDark ? 'bg-dark' : 'bg-light'} border-end`}
      style={{
        width: '240px',
        height: '100vh',
        position: 'fixed',
        transition: 'width 0.2s ease-in-out',
        overflowX: 'hidden',
        zIndex: 1030
      }}
    >
      <div className={`d-flex align-items-center justify-content-between p-3 border-bottom ${isDark ? 'border-secondary' : ''}`}>
        <div className="fw-bold text-primary fs-5">
          🚀 Stellar
        </div>
        <button 
          className={`btn btn-sm ${isDark ? 'btn-dark' : 'btn-light'}`}
          onClick={onToggle}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      
      <div className="p-3">
        <div className="d-flex align-items-center mb-2">
          <div 
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{ width: '40px', height: '40px', fontWeight: 'bold' }}
          >
            HK
          </div>
          <div>
            <div className={`fw-bold small ${isDark ? 'text-light' : ''}`}>Henry Klein</div>
            <div className="text-muted small">Administrator</div>
          </div>
        </div>
      </div>
      
      <hr className="my-0" />
      
      <Nav className="flex-column">
        <Nav.Item>
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `nav-link d-flex align-items-center py-3 ${isActive ? `active ${isDark ? 'bg-dark' : 'bg-light'}` : ''} ${isDark ? 'text-light' : ''}`
            }
          >
            <i className="bi bi-house me-3" style={{ marginLeft: '10px' }}></i>
            <span>{AppText.sidebar.home}</span>
          </NavLink>
        </Nav.Item>
        
        <Nav.Item>
          <NavLink 
            to="/profile" 
            className={({isActive}) => 
              `nav-link d-flex align-items-center py-3 ${isActive ? `active ${isDark ? 'bg-dark' : 'bg-light'}` : ''} ${isDark ? 'text-light' : ''}`
            }
          >
            <i className="bi bi-person me-3" style={{ marginLeft: '10px' }}></i>
            <span>{AppText.sidebar.profile}</span>
          </NavLink>
        </Nav.Item>
        
        <Nav.Item>
          <NavLink 
            to="/clients" 
            className={({isActive}) => 
              `nav-link d-flex align-items-center py-3 ${isActive ? `active ${isDark ? 'bg-dark' : 'bg-light'}` : ''} ${isDark ? 'text-light' : ''}`
            }
          >
            <i className="bi bi-people me-3" style={{ marginLeft: '10px' }}></i>
            <span>{AppText.sidebar.clients}</span>
          </NavLink>
        </Nav.Item>
      </Nav>
      
      <hr />
      
      <div className={`px-3 py-2 d-flex justify-content-between align-items-center ${isDark ? 'text-light' : ''}`}>
        <div className="d-flex align-items-center">
          <i className="bi bi-moon me-2"></i>
          <span>{AppText.sidebar.toggle_theme}</span>
        </div>
        <Form.Check 
          type="switch"
          id="theme-switch"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
      </div>
    </div>
  );
};

export default Sidebar; 