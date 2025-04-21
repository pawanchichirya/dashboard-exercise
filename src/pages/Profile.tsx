import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { AppText } from '../utils/text';

const Profile: React.FC = () => {
  return (
    <Container fluid className="p-0">
      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="mb-3">
            {AppText.sidebar.profile}
          </h4>
          <p className="text-muted">
            This is the profile page. The content will be implemented in the future.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile; 