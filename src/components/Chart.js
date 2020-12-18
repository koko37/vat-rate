import React from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = ({type, data, clickedHandler, hoverHandler}) => {
  const rates = Object.values(data);
  const xLabels = Object.keys(data);

  return (
    <Bar
      data={{
        datasets: [
          {
            label: 'Pee',
            type: type || 'bar',
            data: rates,
            fill: false,
            backgroundColor: '#98D4E5',
            borderColor: '#98D4E5',
            hoverBackgroundColor: '#98D4E5',
            hoverBorderColor: '#98D4E5',
            yAxisID: 'y-axis-1'
          }
        ]
      }}
      options={{
        onClick: (evt, e) => {
          if(!e[0]) return;
          const selectedIndex = e[0]._index;
          return clickedHandler(selectedIndex);
        },
        onHover: (evt, e) => {
          if(!e[0]) return;
          const selectedIndex = e[0]._index;
          return hoverHandler(selectedIndex);
        },
        responsive: true,
        tooltips: {
          mode: 'label'
        },
        elements: {
          line: {
            tension: 0.2,
            fill: false,
          },
          point: {
            radius: 3
          }
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
              },
              labels: xLabels,
              ticks: {
                fontColor: 'white',
              }
            }
          ],
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
              gridLines: {
                display: false
              },
              labels: {
                show: true
              },
              ticks: {
                fontColor: 'white',
                suggestedMin: 0,
                suggestedMax: 10,
                beginAtZero: true,
              }
            },
          ]
        }
      }}
    />
  )
}

export default Graph;
