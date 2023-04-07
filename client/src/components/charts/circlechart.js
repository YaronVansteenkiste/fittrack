import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import axios from "axios";

function CircleDiagram() {
  const [currentCalories, setCurrentCalories] = useState(0);
  const [requiredCalories, setRequiredCalories] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8800/api/calories/1").then((response) => {
      setCurrentCalories(response.data[0]);
    });
    axios.get("http://localhost:8800/api/calories/req/1").then((response) => {
      setRequiredCalories(response.data[0]);
    });
  }, []);

  useEffect(() => {
    const circle = circleRef.current;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    const caloriesPercent = currentCalories / requiredCalories;
    const caloriesLength = circumference * caloriesPercent;

    anime({
      targets: circle,
      strokeDasharray: [0, caloriesLength],
      easing: "linear",
      duration: 3000,
      autoplay: true,
    });
  }, [currentCalories, requiredCalories]);

  console.log(currentCalories, requiredCalories)

  return (
    <div className="circlesection">
      <svg
        viewBox="0 0 60 60"
        preserveAspectRatio="xMinYMin meet"
        style={{ height: "27vh", width: "100%" }}
      >
        <text x={16} y={33} fontSize="4" fill={"white"}>
          {requiredCalories - currentCalories} calories left
        </text>
        <circle
          ref={circleRef}
          cx="30"
          cy="30"
          r="24"
          stroke="#D4314E"
          strokeWidth="10"
          fill="transparent"
        />
      </svg>
    </div>
  );
}

export default CircleDiagram;
