import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Support, Learn, Contact, Initiative, EcoShop, Profile, Communities } from "./pages";
import Product from "./components/EcoShopComponents/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";



function App() {
	return (
		<div>
			<ToastContainer />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/support" element={<Support />} />
				<Route path="/learn" element={<Learn />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/initiatives" element={<Initiative />} />
				<Route path="/eco-shop" element={<EcoShop />} />
        <Route path='/eco-shop/:productId' element={<Product />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/communities" element={<Communities />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

