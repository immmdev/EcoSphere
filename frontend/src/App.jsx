import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Profile } from "./pages";

function App() {
	return (
		<div className="">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</div>
	);
}

export default App;
