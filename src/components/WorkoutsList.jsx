
import React, { useEffect } from 'react';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext';
import WorkoutDetails from './WorkoutDetails';

const WorkoutsList = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div>
      {workouts.map((workout) => (
        <WorkoutDetails key={workout._id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutsList;
