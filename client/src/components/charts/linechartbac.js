import React, {useRef} from 'react';
import './linechart.css'
import { useEffect } from 'react';
import anime from 'animejs';

function LineChart() {
  const chartRef = useRef(null);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weights = [22, 155, 44, 60, 35, 121, 34, 66, 140, 3, 23, 5];
  const chartData = weights.map((weight, index) => ({ month: months[index], weight }));

  const currentMonth = new Date().getMonth();
  const chartPoints = chartData.map((data, index) => ({
    x: index * 90 + 90,
    y: 200 - (data.weight),
    label: data.month,
    isCurrentMonth: index === currentMonth
  }));

  const chartLines = chartPoints.map((point, index) => (
    index === chartPoints.length - 1 ?
      null :
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
  ));

  const chartCurrentWeight = chartPoints.map((point, index) => (
    <text
      key={index}
      x={point.x}
      y={point.y -20}
      fontSize="16"
      fill={point.isCurrentMonth ? "#5D59FF" : 'none'}
      textAnchor='middle'
    >
      {`${weights[currentMonth]} kg`}
    </text>
  ));

  


  const chartLabels = chartPoints.map((point, index) => (
    <text
      key={index}
      x={point.x}
      y={220}
      fontSize="16"
      fill={point.isCurrentMonth ? "#5D59FF" : 'white'}
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
      r={point.isCurrentMonth ? "8" : "0"}
      fill="#5D59FF"
      className="chartDots"
    />
  ));

  useEffect(() => {
    const timeline = anime.timeline();

    timeline
      .add({
        targets: `.chartLines`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        delay: 500
      })
      .add({
        targets: `.chartDots`,
        r: 3,
        easing: 'easeInOutSine',
        duration: 500,
        delay: (el, i) => i * 100
      })
      .add({
        targets: `.chartData`,
        translateY: [-20, 0],
        opacity: [0, 1],
        easing: 'easeInOutSine',
        duration: 1000,
        delay: (el, i) => i * 100
      });
  }, []);

  return (
    <svg viewBox="0 0 1150 300" preserveAspectRatio="xMinYMin meet" style={{ height: '27vh', width: '100%' }}>
      {chartLines}
      {chartLabels}
      {chartDots}
      {chartCurrentWeight}
    </svg>
  );
}


export default LineChart;
