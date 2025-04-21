import React from 'react';
import { Row, Col } from 'react-bootstrap';

import PerformanceChart from '../components/charts/PerformanceChart';
import SessionsChart from '../components/charts/SessionsChart';
import QuickActions from '../components/actions/QuickActions';
import ClientsTable from '../components/table/ClientsTable';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={isDark ? 'text-light' : ''}>
      <Row className="g-4 mb-4">
        <Col xs={12} lg={8}>
          <PerformanceChart />
        </Col>
        
        <Col xs={12} lg={4}>
          <SessionsChart />
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col xs={12}>
          <QuickActions />
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col xs={12}>
          <ClientsTable />
        </Col>
      </Row>
    </div>
  );
};

export default Home; 