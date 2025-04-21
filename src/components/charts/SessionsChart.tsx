import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { AppText } from '../../utils/text';

const SessionsChart: React.FC = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  
  // Sample data for pie chart
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: {
        color: isDarkTheme ? '#fff' : '#333'
      },
      data: ['Assigned', 'Not Assigned', 'Reassigned']
    },
    color: ['#fe5461', '#65c466', '#ffcc34'],
    series: [
      {
        name: 'Sessions',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        // Dynamically adjust chart position based on container width
        center: ['35%', '50%'],
        data: [
          { value: 2756, name: 'Assigned' },
          { value: 3872, name: 'Not Assigned' },
          { value: 1606, name: 'Reassigned' }
        ]
      }
    ]
  };

  const totalLeads = 8234;

  return (
    <Card className={`h-100 shadow-sm ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
      <Card.Body>
        <Card.Title className={`mb-3 ${isDarkTheme ? 'text-light' : ''}`}>
          {AppText.charts.sessions_by_channel}
        </Card.Title>
        
        <div className="position-relative" style={{ height: '300px', overflow: 'hidden' }}>
          <div 
            className="position-absolute"
            style={{ 
              top: '50%',
              left: '35%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 1
            }}
          >
            <h4 className={`fw-bold ${isDarkTheme ? 'text-light' : ''}`}>
              {totalLeads.toLocaleString()}
            </h4>
            <p className={`small ${isDarkTheme ? 'text-light opacity-75' : 'text-muted'}`}>
              {AppText.charts.total_leads}
            </p>
          </div>
          <div className="w-100 h-100">
            <ReactECharts 
              option={option} 
              style={{ height: '100%', width: '100%' }} 
              opts={{ renderer: 'svg' }}
              className="echarts-for-react"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SessionsChart; 