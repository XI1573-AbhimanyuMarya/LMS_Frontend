import React, { Component } from "react";
import Chart from "react-apexcharts";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const options = {
  chart: {
    height: 280,
    type: "area",
    toolbar:false
  },
  legend:{show:false},
  dataLabels: {
    enabled: false
  },
  fill: {
    type: "gradient",
    gradient: {
      
      opacityFrom: 1,
      opacityTo: 0.1
    },
    colors: ['#e76600','#f9b900','#3c8200']
  },
  stroke:{
    colors:['#e76600','#f9b900','#3c8200'],
    width: 2,
  },
  xaxis: {
    labels: {
    formatter: function (value, timestamp) {
      return monthNames[value-1];
    }, 
  }
  }
};
const  series= [
  {
    name:"Completed",
    data: [1, 52, 57, 89, 74, 92, 65,1, 52, 57, 89, 74]
  },
  {
    name:"In-Progress",
    data: [45, 52, 38, 45, 19, 23, 90,45, 52, 38, 45, 19]
  },
  {
    name: "Overdue",
    data: [11, 32, 45, 32, 34, 52, 41,11, 32, 45, 32, 34]
  }
];
const LearningPathGraph=()=>{
  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="950"
      height="200"
    />
  );
}

export default LearningPathGraph;