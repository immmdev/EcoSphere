import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Support, Learn, Contact, Initiative, EcoShop, Profile, Communities, Cart } from "./pages";
import Product from "./components/EcoShopComponents/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import CarbonFootprintCalculator from "./pages/EcoCalci";
import Community from "./components/Support/Community";
import LearnGrow from "./components/Support/LearnGrow";
import CarbonTracker from "./components/Support/CarbonTracker";
import Eco from "./components/Support/Eco";
import Initiate from "./components/Support/Initiate";
import GettingStarted from "./components/Support/GettingStarted";



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
				<Route path="/eco-calculator" element={<CarbonFootprintCalculator/>}/>
				<Route path="/getting-started" element={<GettingStarted/>} />
                <Route path="/community" element={<Community/>} />
                <Route path="/learn-grow" element= {<LearnGrow/>}/>
                <Route path="/carbon-tracker" element={<CarbonTracker/>} />
                <Route path="/eco" element={<Eco/>} />
                <Route path="/initiate" element={<Initiate/>} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

