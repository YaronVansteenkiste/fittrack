import React, { useContext, useEffect, useState } from "react";
import './barchart.css'
import anime from "animejs";
import axios from "axios";
import { UserContext } from '../context/UserContext.js'

function BarChart() {

  const [activity, setActivity] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8800/api/activity/"+ (currentUser ? (currentUser.id) : (0)));
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.activity;
      setActivity(data);
    };
    fetchData();
  }, []);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S','M', 'T', 'W', 'T', 'F', 'S'];
  const activityData = activity.map((activity, index) => ({
    day: days[index],
    activity
  }));
  
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
        {activityData.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `calc(${value.activity / Math.max(...activityData.map(a => a.activity)) * 27}vh)`,
              maxWidth: `${100 / activityData.length}%`,
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
