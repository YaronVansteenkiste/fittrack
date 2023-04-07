import React, { useState, useEffect } from "react";
import "./linechart.css";
import anime from "animejs";
import axios from "axios";

function LineChart() {
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8800/api/weights/1");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.weights;
      console.log(data);
      setWeights(data);
    };
    fetchData();
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const chartData = weights.map((weight, index) => ({
    month: months[index],
    weight,
  }));
  const maxWeight = Math.max(...weights);
  const minWeight = Math.min(...weights);
  const weightRange = maxWeight - minWeight;

  const currentMonth = new Date().getMonth();
  const chartPoints = chartData.map((data, index) => ({
    x: index * 90 + 90,
    y: 200 - ((data.weight - minWeight) / weightRange) * 200 + 20,
    label: data.month,
    isCurrentMonth: index === currentMonth,
  }));

  const chartLines = chartPoints.map((point, index) =>
    index === chartPoints.length - 1 ? null : (
      <line
        key={index}
        x1={point.x}
        y1={point.y}
        x2={chartPoints[index + 1].x}
        y2={chartPoints[index + 1].y}
        stroke="#5D59FF"
        strokeWidth="2"
        className="chartLines"
      />
    )
  );

  const chartCurrentWeight = chartPoints.map((point, index) => (
    <text
      key={index}
      x={point.x}
      y={point.y - 6}
      fontSize="16"
      fill={point.isCurrentMonth ? "#5D59FF" : "none"}
      textAnchor="middle"
    >
      {`${weights[currentMonth]} kg`}
    </text>
  ));

  const chartLabels = chartPoints.map((point, index) => (
    <text
      key={index}
      x={point.x}
      y={260}
      fontSize="16"
      fill={point.isCurrentMonth ? "#5D59FF" : "white"}
      className="chartData"
    >
      {point.label}
    </text>
  ));

  const chartDots = chartPoints.map((point, index) => (
    <circle
      key={index}
      cx={point.x}
      cy={point.y}
      fill="#5D59FF"
      className="chartDots"
    />
  ));

  useEffect(() => {
    const animateChart = () => {
      const timeline = anime.timeline();

      timeline
        .add({
          targets: ".chartLines",
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: "easeInOutSine",
          duration: 2000,
          delay: 500,
        })
        .add(
          {
            targets: ".chartDots",
            r: (point, index) => (point.isCurrentMonth ? "10" : "4"),
            easing: "easeInOutSine",
            duration: 500,
            delay: (point, index) => index * 100,
          },
          "-=1500"
        )
        .add(
          {
            targets: ".chartData",
            translateY: [-20, 0],
            opacity: [0, 1],
            easing: "easeInOutSine",
            duration: 1000,
            delay: (point, index) => index * 100,
          },
          "-=1000"
        );
    };
    animateChart();
  }, [chartPoints]);

  return (
    <svg
      viewBox="0 0 1150 350"
      preserveAspectRatio="xMinYMin meet"
      style={{ height: "27vh", width: "100%" }}
    >
      {chartLines}
      {chartLabels}
      {chartDots}
      {chartCurrentWeight}
    </svg>
  );
}

export default LineChart;