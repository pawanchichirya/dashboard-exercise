import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { Client } from '../../types';

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (clientData: Omit<Client, 'id' | 'createdAt'>) => void;
}

const DEFAULT_CLIENT_DATA: Omit<Client, 'id' | 'createdAt'> = {
  name: '',
  email: '',
  region: '',
  organization: {
    name: '',
    registeredNumber: '',
    address: '',
  },
  project: {
    name: '',
    details: '',
    techStack: '',
    requiredResources: '',
    hours: 0,
  },
};

const regions = [
  { value: 'north_america', label: 'North America' },
  { value: 'south_america', label: 'South America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
];

const ClientForm: React.FC<ClientFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeStep, setActiveStep] = useState(0);
  const [clientData, setClientData] = useState<Omit<Client, 'id' | 'createdAt'>>(
    DEFAULT_CLIENT_DATA
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    "Client Information",
    "Organization Details",
    "Project Details",
  ];

  const validate = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 0) {
      if (!clientData.name) {
        newErrors.name = "This field is required";
        isValid = false;
      }
      if (!clientData.email) {
        newErrors.email = "This field is required";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(clientData.email)) {
        newErrors.email = "Please enter a valid email";
        isValid = false;
      }
      if (!clientData.region) {
        newErrors.region = "This field is required";
        isValid = false;
      }
    } else if (step === 1) {
      if (!clientData.organization.name) {
        newErrors['organization.name'] = "This field is required";
        isValid = false;
      }
      if (!clientData.organization.registeredNumber) {
        newErrors['organization.registeredNumber'] = "This field is required";
        isValid = false;
      }
      if (!clientData.organization.address) {
        newErrors['organization.address'] = "This field is required";
        isValid = false;
      }
    } else if (step === 2) {
      if (!clientData.project.name) {
        newErrors['project.name'] = "This field is required";
        isValid = false;
      }
      if (!clientData.project.details) {
        newErrors['project.details'] = "This field is required";
        isValid = false;
      }
      if (!clientData.project.techStack) {
        newErrors['project.techStack'] = "This field is required";
        isValid = false;
      }
      if (!clientData.project.requiredResources) {
        newErrors['project.requiredResources'] = "This field is required";
        isValid = false;
      }
      if (!clientData.project.hours) {
        newErrors['project.hours'] = "This field is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validate(activeStep)) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    if (validate(activeStep)) {
      onSubmit(clientData);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number,
    nestedField?: string
  ) => {
    if (nestedField) {
      setClientData((prev) => {
        const newData = { ...prev };
        if (field === 'organization') {
          newData.organization = {
            ...prev.organization,
            [nestedField]: value,
          };
        } else if (field === 'project') {
          newData.project = {
            ...prev.project,
            [nestedField]: value,
          };
        }
        return newData;
      });
    } else {
      setClientData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="mt-3">
            <h6>Contact Information</h6>
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Client Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={clientData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    isInvalid={!!errors.name}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    value={clientData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    isInvalid={!!errors.email}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Region<span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    value={clientData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    isInvalid={!!errors.region}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  >
                    <option value="">Select a region</option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.region && <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
            </Row>
          </div>
        );
      case 1:
        return (
          <div className="mt-3">
            <h6>Organization Details</h6>
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Organization Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={clientData.organization.name}
                    onChange={(e) => handleInputChange('organization', e.target.value, 'name')}
                    isInvalid={!!errors['organization.name']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['organization.name'] && <Form.Control.Feedback type="invalid">{errors['organization.name']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Registered Number<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={clientData.organization.registeredNumber}
                    onChange={(e) => handleInputChange('organization', e.target.value, 'registeredNumber')}
                    isInvalid={!!errors['organization.registeredNumber']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['organization.registeredNumber'] && <Form.Control.Feedback type="invalid">{errors['organization.registeredNumber']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={clientData.organization.address}
                    onChange={(e) => handleInputChange('organization', e.target.value, 'address')}
                    isInvalid={!!errors['organization.address']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['organization.address'] && <Form.Control.Feedback type="invalid">{errors['organization.address']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
            </Row>
          </div>
        );
      case 2:
        return (
          <div className="mt-3">
            <h6>Project Details</h6>
            <Row className="g-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Project Name<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={clientData.project.name}
                    onChange={(e) => handleInputChange('project', e.target.value, 'name')}
                    isInvalid={!!errors['project.name']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['project.name'] && <Form.Control.Feedback type="invalid">{errors['project.name']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Project Details<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={clientData.project.details}
                    onChange={(e) => handleInputChange('project', e.target.value, 'details')}
                    isInvalid={!!errors['project.details']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['project.details'] && <Form.Control.Feedback type="invalid">{errors['project.details']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Tech Stack<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={clientData.project.techStack}
                    onChange={(e) => handleInputChange('project', e.target.value, 'techStack')}
                    isInvalid={!!errors['project.techStack']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['project.techStack'] && <Form.Control.Feedback type="invalid">{errors['project.techStack']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Required Resources<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={clientData.project.requiredResources}
                    onChange={(e) => handleInputChange('project', e.target.value, 'requiredResources')}
                    isInvalid={!!errors['project.requiredResources']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['project.requiredResources'] && <Form.Control.Feedback type="invalid">{errors['project.requiredResources']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Estimated Hours<span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    value={clientData.project.hours || ''}
                    onChange={(e) => handleInputChange('project', parseInt(e.target.value, 10) || 0, 'hours')}
                    isInvalid={!!errors['project.hours']}
                    required
                    className={isDark ? 'bg-dark text-light border-secondary' : ''}
                  />
                  {errors['project.hours'] && <Form.Control.Feedback type="invalid">{errors['project.hours']}</Form.Control.Feedback>}
                </Form.Group>
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal 
      show={open} 
      onHide={onClose} 
      size="lg" 
      centered
      fullscreen="sm-down"
      scrollable
      dialogClassName="modal-responsive"
    >
      <Modal.Header closeButton className={isDark ? 'bg-dark text-light border-secondary' : ''}>
        <Modal.Title>Add New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body className={isDark ? 'bg-dark text-light' : ''}>
        <div className="py-3">
          <ul className="nav nav-pills nav-justified mb-4">
            {steps.map((label, index) => (
              <li className="nav-item" key={label}>
                <button 
                  className={`nav-link ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'text-success' : ''} ${isDark && activeStep !== index && activeStep <= index ? 'text-light' : ''}`}
                >
                  {index + 1}. {label}
                </button>
              </li>
            ))}
          </ul>
          {renderStepContent(activeStep)}
        </div>
      </Modal.Body>
      <Modal.Footer className={isDark ? 'bg-dark text-light border-secondary' : ''}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <div className="ms-auto">
          {activeStep !== 0 && (
            <Button variant="outline-primary" onClick={handleBack} className="me-2">
              Previous
            </Button>
          )}
          <Button variant="primary" onClick={handleNext}>
            {activeStep === steps.length - 1
              ? "Submit"
              : "Next"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientForm; 