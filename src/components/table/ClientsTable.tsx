import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Badge, 
  Form, 
  InputGroup,
} from 'react-bootstrap';
import { Product } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { AppText } from '../../utils/text';

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    storeId: 'Katie Holmes',
    client: 'Katie Holmes',
    amount: 3621.00,
    gateway: 'alipay',
    createdAt: '04 Jun 2019',
    paidAt: '18 Jul 2019',
    status: 'Paid',
  },
  {
    id: '2',
    storeId: 'Minnie Copeland',
    client: 'Minnie Copeland',
    amount: 6245.00,
    gateway: 'paypal',
    createdAt: '25 Sep 2019',
    paidAt: '07 Oct 2019',
    status: 'Pending',
  },
  {
    id: '3',
    storeId: 'John Smith',
    client: 'John Smith',
    amount: 4500.00,
    gateway: 'stripe',
    createdAt: '12 Nov 2019',
    paidAt: '22 Nov 2019',
    status: 'Paid',
  },
  {
    id: '4',
    storeId: 'Sarah Johnson',
    client: 'Sarah Johnson',
    amount: 7851.00,
    gateway: 'transfer',
    createdAt: '30 Dec 2019',
    paidAt: '15 Jan 2020',
    status: 'Pending',
  },
];

const ClientsTable: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [products] = useState<Product[]>(sampleProducts);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.storeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.gateway.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className={`shadow-sm ${isDark ? 'bg-dark text-light' : ''}`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className={`mb-0 ${isDark ? 'text-light' : ''}`}>{AppText.products.inventory}</h5>
          <InputGroup className="w-auto">
            <Form.Control
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="sm"
              className={isDark ? 'bg-dark text-light border-secondary' : ''}
            />
            <InputGroup.Text className={isDark ? 'bg-dark text-light border-secondary' : ''}>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
          </InputGroup>
        </div>
        
        <div className="table-responsive">
          <Table hover className={`align-middle ${isDark ? 'table-dark' : ''}`}>
            <thead className={isDark ? 'bg-dark text-light border-secondary' : 'table-light'}>
              <tr>
                <th>{AppText.products.store_id}</th>
                <th>{AppText.products.amount}</th>
                <th>{AppText.products.gateway}</th>
                <th>{AppText.products.created_at}</th>
                <th>{AppText.products.paid_at}</th>
                <th>{AppText.products.status}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.storeId}</td>
                  <td>${product.amount.toFixed(2)}</td>
                  <td>{product.gateway}</td>
                  <td>{product.createdAt}</td>
                  <td>{product.paidAt}</td>
                  <td>
                    <Badge bg={product.status === 'Paid' ? 'success' : 'warning'}>
                      {product.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        <div className="d-flex justify-content-end mt-3">
          <a href="#" className={`text-decoration-none ${isDark ? 'text-light' : ''}`}>
            {AppText.products.view_all} →
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClientsTable; 