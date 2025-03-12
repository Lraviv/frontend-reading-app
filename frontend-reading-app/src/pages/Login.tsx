import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error before new request
    
        try {
          const response = await axios.post("http://127.0.0.1:8000/users/token", 
            new URLSearchParams({
              username: username,
              password: password,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          );
          const { access_token } = response.data;
      localStorage.setItem("token", access_token); // Save token
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError("Invalid username or password. Try again.");
      console.log(err)
    }
  }; 

    return (
        <div className="flex items-center justify-center flex-col"> 
        <div className="pt-16 pb-10">
            <label className="text-xl font-mono"> hello, please Login to enter LiBooks</label>
        </div>
        <div className="w-full max-w-xs">
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-14 pb-12  mb-4 rounded-3xl">
                {/* user name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                {/* password */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

                {/* forgot password and sign in button */}
                <div className="flex items-center justify-between">
                    <button className="bg-[#232323] hover:bg-black hover:scale-105 text-white font-bold mr-3 py-2 px-10 rounded-xl focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2025 Lihi Raviv. All rights reserved.
            </p>
        </div>
        </div>

    );
  }
  