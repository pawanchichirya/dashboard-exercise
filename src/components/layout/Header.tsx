import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { AppText } from '../../utils/text';

interface HeaderProps {
  open: boolean;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ open, onToggleSidebar }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Navbar bg={isDark ? 'dark' : 'light'} variant={isDark ? 'dark' : 'light'} expand="lg" className="border-bottom" 
      style={{ 
        marginLeft: open ? '240px' : '0',
        width: `calc(100% - ${open ? '240px' : '0'})`,
        transition: 'all 0.2s',
        position: 'fixed',
        top: 0,
        zIndex: 1020
      }}
    >
      <Container fluid>
        {!open && (
          <Button 
            variant={isDark ? 'dark' : 'light'} 
            size="sm" 
            className={`me-2 border ${isDark ? 'border-secondary' : ''}`}
            onClick={onToggleSidebar}
          >
            <i className="bi bi-list"></i>
          </Button>
        )}
        <Navbar.Brand className={isDark ? 'text-light' : ''}>{AppText.app.welcome}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex flex-grow-1 mx-4">
            <FormControl
              type="search"
              placeholder="Search"
              className={`me-2 ${isDark ? 'bg-dark border-secondary text-light' : ''}`}
              aria-label="Search"
            />
            <Button variant={isDark ? 'outline-light' : 'outline-success'}>Search</Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link href="#" className="position-relative">
              Notifications
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                4
              </Badge>
            </Nav.Link>
            <Nav.Link href="#" className="position-relative">
              Cart
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                3
              </Badge>
            </Nav.Link>
            <Nav.Link href="#">
              <div className="d-flex align-items-center">
                <span className="me-2">Henry Klein</span>
                <div 
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px', fontSize: '14px' }}
                >
                  HK
                </div>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 