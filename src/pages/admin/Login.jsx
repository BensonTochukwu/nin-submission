import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.accessToken
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Admin Login
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          className="w-full bg-green-900 text-white py-3 rounded-lg"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;