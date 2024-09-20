import React, { useState } from "react";
import UseSignup from "../Hooks/UseSignup";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = UseSignup();
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform the signup
    await signup(email, password);

    // Redirect to the login page after successful signup
    if (!error) {
      navigate("/login");  // Redirect to login page
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md my-10 mx-auto p-5 bg-white border-md"
    >
      <h2 className="text-center font-semibold text-2xl">Signup</h2>

      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <button
        disabled={isLoading}
        className={`bg-green-600 p-2.5 text-white font-[Poppins] rounded justify-center ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </button>

      {error && <div className="text-red-500 border-2 border-red-400 p-4 m-3">{error}</div>}
    </form>
  );
};

export default Signup;
