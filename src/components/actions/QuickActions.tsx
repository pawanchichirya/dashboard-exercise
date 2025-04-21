import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Alert 
} from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import ClientForm from '../forms/ClientForm';

const QuickActions: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [openForm, setOpenForm] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    variant: 'success' | 'info' | 'warning' | 'danger';
  }>({
    show: false,
    message: '',
    variant: 'info'
  });

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleAddClient = (clientData: any) => {
    console.log('Client data:', clientData);
    setOpenForm(false);
    setNotification({
      show: true,
      message: 'Client added successfully!',
      variant: 'success'
    });

    // Hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const actionButtons = [
    {
      label: "Add Client",
      icon: "bi-person-plus",
      onClick: handleOpenForm,
      variant: 'primary'
    },
    {
      label: "Create Quote",
      icon: "bi-receipt",
      onClick: () => console.log('Create quote clicked'),
      variant: 'secondary'
    },
    {
      label: "Enter Payment",
      icon: "bi-credit-card",
      onClick: () => console.log('Enter payment clicked'),
      variant: 'info'
    },
    {
      label: "Create Invoice",
      icon: "bi-file-earmark-text",
      onClick: () => console.log('Create invoice clicked'),
      variant: 'warning'
    }
  ];

  return (
    <>
      {notification.show && (
        <Alert 
          variant={notification.variant}
          className="mb-3"
          dismissible
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
        >
          {notification.message}
        </Alert>
      )}
      
      <Card 
        className={`mb-4 ${isDark ? 'bg-dark text-light' : 'bg-light'}`}
      >
        <Card.Body>
          <h5 className={`mb-3 ${isDark ? 'text-light' : ''}`}>
            Quick Actions
          </h5>
          
          <Row className="g-2 mt-1">
            {actionButtons.map((button, index) => (
              <Col xs={12} sm={6} md={3} key={index}>
                <Button
                  variant={button.variant}
                  className="w-100 py-2 text-start d-flex align-items-center"
                  onClick={button.onClick}
                >
                  <i className={`${button.icon} me-2 fs-5`}></i>
                  {button.label}
                </Button>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      
      <ClientForm 
        open={openForm} 
        onClose={handleCloseForm} 
        onSubmit={handleAddClient} 
      />
    </>
  );
};

export default QuickActions; 