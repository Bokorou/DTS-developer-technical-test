import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, userService } from "../services/Api";

const Login = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickFunction = () => {
    setIsCreating((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleCreateUser = async () => {
    interface newUser {
      id: string;
      username: string;
      name: string;
    }
    try {
      const response = await userService.createUser({ username, password });
      const newUser = response.data as newUser;
      if (!newUser?.id) {
        console.error("User ID missing in response");
        return;
      }

      localStorage.setItem("userId", newUser.id);
      navigate("/Task");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    interface User {
      id: string;
      username: string;
      name: string;
    }
    try {
      const response = await userService.login({ username, password });
      const user = response.data as User;
      if (!user?.id) {
        console.error("User ID missing in response");
        return;
      }

      localStorage.setItem("userId", user.id);

      navigate("/Task");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen ">
      <h1 className=" text-3xl font-semibold">Welcome to Task Manager!</h1> 
      <div className="bg-[#E6D8C3] p-8 rounded-lg shadow-lg w-80">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#123458]">
            {isCreating ? "Sign Up" : "Sign In"}
          </h1>
        </div>
        <form className="flex flex-col space-y-4">
          <input
            className=" bg-[#FAF8F1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Username"
            value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className=" bg-[#FAF8F1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isCreating && (
            <input
            className=" bg-[#FAF8F1] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Re-type Password"
              
            />
          )}
          <button
            type="button"
            onClick={() => (isCreating ? handleCreateUser() : handleLogin())}
            className="bg-white text-black font-semibold rounded py-2 hover:bg-gray-100 shadow-lg transition"
          >
            {isCreating ? "Sign Up" : "Sign In"}
          </button>
        </form>
        {!isCreating ? (
          <p className="text-sm text-[#123458] text-center mt-2">
            Don’t have an account yet?{" "}
            <span
              onClick={onClickFunction}
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
            >
              Sign up
            </span>
          </p>
        ): (
          <p className="text-sm text-gray-600 text-center mt-2">
            Already have an account?{" "}
            <span
              onClick={onClickFunction}
              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
            >
              Sign in
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
