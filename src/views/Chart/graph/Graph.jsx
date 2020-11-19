import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May', 'june', 'july', 'August', 'Septeber', 'October', 'November','December'],
  datasets: [
    {
      label: 'A',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'rgba(20,87,53,0.3)',
      borderColor: 'rgba(20,87,53,1)',
      borderWidth: 2,
      data: [2, 5, 80, 81, 56,65, 59, 8, 81, 56,27,1]
    },
    {
        label: 'B',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,92,0.3)',
        borderColor: 'rgba(75,192,92,1)',
        borderWidth: 2,
        data: [65, 59, 80, 20, 29, 80, 17, 56,81, 56,97,20]
      },
      {
        label: 'C',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,92,192,0.3)',
        borderColor: 'rgba(75,92,192,1)',
        borderWidth: 2,
        data: [65, 59, 80,65, 59, 80, 81, 56, 81, 56,11,44]
      }
  ]
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Line height="40px" 
          data={state}
          options={{
              responsive:true,
            legend:{
              display:true,
              position:'right'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                    }
                }],
                yAxes: [{
                    stacked: false,
                    scaleLabel: {
                        display: true,

                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 25 
                      }
                }]
            },
            elements:{
                point:{
                    radius:0
                }
            },
            legend: {
                display: false
            },
          }}
        />
        
      </div>
    );
  }
}
