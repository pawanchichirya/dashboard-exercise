import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
  const { theme: mode } = useTheme();
  
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', mode);
    
    // Apply additional custom styling based on theme
    if (mode === 'dark') {
      document.body.classList.add('bg-dark');
      document.body.classList.remove('bg-light');
      
      // Set additional CSS variables for dark theme if needed
      document.documentElement.style.setProperty('--bs-body-color', '#f8f9fa');
      document.documentElement.style.setProperty('--bs-body-bg', '#212529');
      document.documentElement.style.setProperty('--bs-tertiary-bg', '#2c3034');
    } else {
      document.body.classList.add('bg-light');
      document.body.classList.remove('bg-dark');
      
      // Reset CSS variables for light theme
      document.documentElement.style.setProperty('--bs-body-color', '#212529');
      document.documentElement.style.setProperty('--bs-body-bg', '#ffffff');
      document.documentElement.style.setProperty('--bs-tertiary-bg', '#f8f9fa');
    }
  }, [mode]);

  return <>{children}</>;
};

export default AppThemeProvider; 