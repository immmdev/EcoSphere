import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../contexts/ShopContext";

const Login = () => {
	const { token, setToken, backendUrl, navigate } = React.useContext(ShopContext);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(backendUrl + "/api/user/login", { email, password });
			if (response.data.success) {
				setToken(response.data.token);
				localStorage.setItem("token", response.data.token);
				// navigate("/");
			} else {
				toast.error(response.data.message);
			}
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data?.message || "Login failed");
		}
	};

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, [token]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-green-50">
			<div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
				<h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
					Welcome Back 🌱
				</h2>
				<p className="text-gray-600 text-center mb-6">
					Log in to continue your sustainable journey.
				</p>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
						required
					/>
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
					>
						Login
					</button>
				</form>
				<p className="text-sm text-center mt-4 text-gray-600">
					Don’t have an account?{" "}
					<Link to="/signup" className="text-green-700 font-semibold">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
