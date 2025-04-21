import React from 'react';
import { Container, Card } from 'react-bootstrap';
import ClientsTable from '../components/table/ClientsTable';
import { AppText } from '../utils/text';

const Clients: React.FC = () => {
  return (
    <Container fluid className="p-0">
      <Card className="mb-4">
        <Card.Body>
          <h4 className="mb-2">
            {AppText.sidebar.clients}
          </h4>
          <p className="text-muted">
            Manage your clients and their information below.
          </p>
        </Card.Body>
      </Card>
      
    </Container>
  );
};

export default Clients; 