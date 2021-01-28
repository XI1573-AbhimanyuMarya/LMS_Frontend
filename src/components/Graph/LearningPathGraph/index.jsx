import React, { Component } from "react";
import Chart from "react-apexcharts";
import { months } from "moment";

const LearningPathGraph = ({ learningPathGraphAdmin }) => {

  let months = [];
  if (learningPathGraphAdmin.length > 0) {
    for (var i in learningPathGraphAdmin[0].dashboardGraphStatistics) {
      months.push(learningPathGraphAdmin[0].dashboardGraphStatistics[i].month);
    }
  }
  const monthNames = months;

  const options = {
    chart: {
      height: 280,
      type: "area",
      toolbar: false,
    },
    legend: { show: false },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 1,
        opacityTo: 0.1,
      },
      colors: ["#e76600", "#f9b900", "#3c8200"],
    },
    stroke: {
      colors: ["#e76600", "#f9b900", "#3c8200"],
      width: 2,
    },
    xaxis: {
      labels: {
        formatter: function (value, timestamp) {
          return monthNames[value - 1];
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      min: 0,
      max: 100,
      labels: {
        formatter: function (val, index) {
          return `${val}%`;
        },
      },
    },
  };
  let completed = [];
  let inprogress = [];
  let overdue = [];
  for (let i in learningPathGraphAdmin) {
    // debugger;
    if (learningPathGraphAdmin[i].status.toLowerCase() == "completed") {
      // debugger;
      for (let j in learningPathGraphAdmin[i].dashboardGraphStatistics) {
        // debugger;
        completed.push(
          learningPathGraphAdmin[i].dashboardGraphStatistics[j]["count"]
        );
      }
    }
    if (learningPathGraphAdmin[i].status.toLowerCase() == "in-progress") {
      // debugger;
      for (let j in learningPathGraphAdmin[i].dashboardGraphStatistics) {
        // debugger;
        inprogress.push(
          learningPathGraphAdmin[i].dashboardGraphStatistics[j]["count"]
        );
      }
    }
    if (learningPathGraphAdmin[i].status.toLowerCase() == "overdue") {
      // debugger;
      for (let j in learningPathGraphAdmin[i].dashboardGraphStatistics) {
        // debugger;
        overdue.push(
          learningPathGraphAdmin[i].dashboardGraphStatistics[j]["count"]
        );
      }
    }
  }

  const series = [
    {
      name: "Completed",
      data: completed,
    },
    {
      name: "In-Progress",
      data: inprogress,
    },
    {
      name: "Overdue",
      data: overdue,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height="184.3"
    />
  );
};

export default LearningPathGraph;
