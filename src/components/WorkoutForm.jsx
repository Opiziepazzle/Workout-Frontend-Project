import React, { useState } from 'react';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext';
import { useAuthContext } from '../Hooks/UseAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the user is not logged in
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    // Send POST request to create a new workout
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    // Handle the response
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      // Clear the form and state
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);

      // Dispatch the newly created workout to update the global state
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs justify-center">
      <h1 className="text-2xl font-bold">Add a New Workout</h1>

      <label className="block">Exercise Title:</label>
      <input
        className={emptyFields.includes("title") ? "error" : ""}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label className="block">Load (in kg):</label>
      <input
        className={emptyFields.includes("load") ? "error" : ""}
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label className="block">Reps:</label>
      <input
        className={emptyFields.includes("reps") ? "error" : ""}
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button
        className="bg-green-600 p-2.5 text-white font-[Poppins] rounded pointer justify-center hover:bg-green-400"
      >
        Add Workout
      </button>

      {error && (
        <div className="p-2.5 bg-gray-100 border-2 border-red-500 text-red-500 rounded my-5 mx-0">
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;