
import { useState } from "react";
import { useAuthContext } from "./UseAuthContext";

const UseSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Initialize to false
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('https://theworkoutapplication.onrender.com/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save signup
      localStorage.setItem('user', JSON.stringify(json));

      // update auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default UseSignup;
