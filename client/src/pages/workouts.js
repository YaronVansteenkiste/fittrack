import React, { useEffect } from 'react';
import LeftBanner from '../components/banners/leftbanner';
import './profile.css';
import './workouts.css';
import Topbanner from '../components/banners/topbanner';

function Workouts() {
    useEffect(()=> {
        document.getElementById('navworkouts').classList.toggle('activenav')
    })
  return (
    <div className='App'>
      <LeftBanner />
      <div className='rightsection'>
        <Topbanner />
        <div className='workoutcontainer'>
          <p className='subtitles'>Strength Training</p>
          <p><strong>Exercise 1:</strong> Bench Press</p>
          <p>Sets: 4</p>
          <p>Reps: 8-10</p>
          {/* Add more exercises and details as needed */}
        </div>

        <div className='workoutcontainer'>
          <p className='subtitles'>HIIT</p>
          <p><strong>Exercise 1:</strong> Jump Squats</p>
          <p><strong>Exercise 2:</strong> Burpees</p>
          <p><strong>Exercise 3:</strong> Mountain Climbers</p>
          <p>Duration: 20 minutes</p>
          {/* Add more exercises and details as needed */}
        </div>

        <div className='workoutcontainer'>
          <p className='subtitles'>Cardio</p>
          <p><strong>Exercise:</strong> Running</p>
          <p>Distance: 3 miles</p>
          <p>Pace: Moderate</p>
          {/* Add more cardio options and details as needed */}
        </div>

        <div className='workoutcontainer'>
          <p className='subtitles'>Calisthenics</p>
          <p><strong>Exercise 1:</strong> Push-Ups</p>
          <p><strong>Exercise 2:</strong> Bodyweight Squats</p>
          <p><strong>Exercise 3:</strong> Plank</p>
          <p><strong>Exercise 4:</strong> Pull-Ups</p>
          {/* Add more calisthenics exercises and details as needed */}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
