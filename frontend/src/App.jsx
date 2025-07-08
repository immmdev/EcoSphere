import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Support, Learn, Contact, Initiative, EcoShop, Profile, Communities, Cart } from "./pages";
import Product from "./components/EcoShopComponents/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import CarbonFootprintCalculator from "./components/EcoCalci";



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
                <Route path="/cart" element={<Cart />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/communities" element={<Communities />} />
				<Route path="/calculator" element={<CarbonFootprintCalculator/>}/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

