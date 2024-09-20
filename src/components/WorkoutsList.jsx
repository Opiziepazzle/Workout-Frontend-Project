// import { createContext, useReducer } from 'react';

// // Create the context
// export const WorkoutsContext = createContext();

// // Reducer to manage the workout state actions
// const workoutsReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_WORKOUTS':
//       return { workouts: action.payload };
//     case 'CREATE_WORKOUT':
//       return { workouts: [action.payload, ...state.workouts] };
//     case 'DELETE_WORKOUT':
//       return { workouts: state.workouts.filter((w) => w._id !== action.payload._id) };
//     default:
//       return state;
//   }
// };

// // WorkoutsContextProvider that wraps the application to provide the workouts state
// export const WorkoutsContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(workoutsReducer, { workouts: [] });

//   return (
//     <WorkoutsContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </WorkoutsContext.Provider>
//   );
// };



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
