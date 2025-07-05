import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./pages";
import Nav from "./components/Nav";

function App() {
	return (
		<div className="">
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
