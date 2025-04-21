import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { AppText } from '../../utils/text';

const PerformanceChart: React.FC = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Sample data
  const complaintsData = [65, 59, 80, 81, 56, 55, 40, 60, 70, 45, 55, 60];
  const tasksDoneData = [28, 48, 40, 19, 86, 27, 90, 40, 30, 50, 20, 30];
  const attendsData = [45, 30, 25, 40, 60, 45, 35, 50, 40, 35, 40, 45];
  
  const totalComplaints = complaintsData.reduce((sum, val) => sum + val, 0);
  const totalTasksDone = tasksDoneData.reduce((sum, val) => sum + val, 0);
  const totalAttends = attendsData.reduce((sum, val) => sum + val, 0);

  const option = {
    legend: {
      data: [
        { name: `Complaints (${totalComplaints})`, itemStyle: { color: '#36c7c9' } },
        { name: `Task Done (${totalTasksDone})`, itemStyle: { color: '#8f5fe8' } },
        { name: `Attends (${totalAttends})`, itemStyle: { color: '#fe5461' } }
      ],
      textStyle: {
        color: isDarkTheme ? '#fff' : '#333'
      },
      bottom: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    color: ['#36c7c9', '#8f5fe8', '#fe5461'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: months,
        axisLine: {
          lineStyle: {
            color: isDarkTheme ? '#666' : '#ccc'
          }
        },
        axisLabel: {
          color: isDarkTheme ? '#fff' : '#333'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 100,
        axisLine: {
          lineStyle: {
            color: isDarkTheme ? '#666' : '#ccc'
          }
        },
        axisLabel: {
          color: isDarkTheme ? '#fff' : '#333'
        },
        splitLine: {
          lineStyle: {
            color: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }
        }
      }
    ],
    series: [
      {
        name: `Complaints (${totalComplaints})`,
        type: 'bar',
        stack: 'x',
        emphasis: {
          focus: 'series'
        },
        data: complaintsData
      },
      {
        name: `Task Done (${totalTasksDone})`,
        type: 'bar',
        stack: 'x',
        emphasis: {
          focus: 'series'
        },
        data: tasksDoneData
      },
      {
        name: `Attends (${totalAttends})`,
        type: 'bar',
        stack: 'x',
        emphasis: {
          focus: 'series'
        },
        data: attendsData
      }
    ]
  };

  return (
    <Card className={`mb-4 h-100 shadow-sm ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
      <Card.Body>
        <Card.Title className={`mb-3 ${isDarkTheme ? 'text-light' : ''}`}>
          {AppText.charts.performance_indicator}
        </Card.Title>
        <div className="w-100" style={{ height: '300px', overflow: 'hidden' }}>
          <ReactECharts 
            option={option} 
            style={{ height: '100%', width: '100%' }} 
            opts={{ renderer: 'svg' }}
            className="echarts-for-react"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PerformanceChart; 