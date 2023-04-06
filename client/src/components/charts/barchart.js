import React, { useEffect } from "react";
import './barchart.css'
import anime from "animejs";

function BarChart() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S','M', 'T', 'W', 'T', 'F', 'S'];
  const activity = [257, 1424, 244, 1245, 938, 2424, 244, 3, 244, 124, 5, 46, 2,];
  const today = new Date().getDay() -1;

  useEffect(() => {
    const timeline = anime.timeline();

    timeline
    .add ({
      targets: '.bars',
      opacity: 1,
      easing: 'easeInOutQuad',
      duration: 2000,
    })
  }, [])

  return (
    <div className="barchart">
      <div className="bars">
        {activity.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `calc(${value / Math.max(...activity) * 27}vh)`,
              maxWidth: `${100 / activity.length}%`,
              backgroundColor: index === today ? 'white' : '#4697C5',
            }}
          />
        ))}
      </div>
      <div className="labels">
        {days.map((day, index) => (
          <span key={index} className="label">{day}</span>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
