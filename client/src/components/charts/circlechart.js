import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

function CircleDiagram() {
    const amountCalories = 900;
    const maxAmountCalories = 2400;
  
    const circleRef = useRef(null);
  
    useEffect(() => {
      const circle = circleRef.current;
  
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
  
      const caloriesPercent = amountCalories / maxAmountCalories;
      const caloriesLength = circumference * caloriesPercent;
  
      anime({
        targets: circle,
        strokeDasharray: [0, caloriesLength],
        easing: "linear",
        duration: 3000,
        autoplay: true, 
      });
  
    }, []);
  
    return (
      <div className="circlesection">
        <svg
          viewBox="0 0 60 60"
          preserveAspectRatio="xMinYMin meet"
          style={{ height: "27vh", width: "100%" }}
        >
            <text
            x={16}
            y={33}
            fontSize="4"
            fill={'white'}
            >{maxAmountCalories-amountCalories} calories left</text>
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
