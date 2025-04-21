import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import AppThemeProvider from './theme';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Clients from './pages/Clients';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            {/* <Route path="/projects" element={<Profile />} /> */}
          </Routes>
        </Router>
      </AppThemeProvider>
    </ThemeProvider>
  );
};

export default App;
