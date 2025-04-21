export interface Client {
  id: string;
  name: string;
  email: string;
  region: string;
  organization: {
    name: string;
    registeredNumber: string;
    address: string;
  };
  project: {
    name: string;
    details: string;
    techStack: string;
    requiredResources: string;
    hours: number;
  };
  createdAt: Date;
}

export interface Product {
  id: string;
  storeId: string;
  client: string;
  amount: number;
  gateway: string;
  createdAt: string;
  paidAt: string;
  status: 'Paid' | 'Pending';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  budget: number;
  team: string[];
  technologies: string[];
  createdAt: string;
} 