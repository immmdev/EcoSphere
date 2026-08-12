import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import {
	Home,
	Calculator,
	ShoppingBag,
	Users,
	BookOpen,
	Sprout,
	LifeBuoy,
	Mail,
	ShoppingCart,
	Package,
	LogOut,
	LogIn,
	UserPlus,
} from "lucide-react";
import { ShopContext } from "../contexts/ShopContext";

function Navbar() {
	const { token, setToken } = useContext(ShopContext);
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const profileDropdownRef = useRef(null);

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
		navigate("/login");
	};

	const toggleProfileDropdown = () => {
		setIsProfileDropdownOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				profileDropdownRef.current &&
				!profileDropdownRef.current.contains(event.target)
			) {
				setIsProfileDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const navLinks = [
		{ name: "Home", path: "/", icon: Home },
		{ name: "EcoCalculator", path: "/eco-calculator", icon: Calculator },
		{ name: "EcoShopping", path: "/eco-shop", icon: ShoppingBag },
		{ name: "Communities", path: "/communities", icon: Users },
		{ name: "Learn", path: "/learn", icon: BookOpen },
		{ name: "Initiatives", path: "/initiatives", icon: Sprout },
		{ name: "Support", path: "/support", icon: LifeBuoy },
		{ name: "Contact", path: "/contact", icon: Mail },
	];

	const tileLinkClass = ({ isActive }) =>
		`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-150 ${
			isActive ? "bg-lime-300 text-green-900 font-semibold" : "bg-white/10 hover:bg-white/20"
		}`;

	return (
		<nav className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 py-3">
			{/* Floating glossy island */}
			<div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl border border-white/15 bg-[rgba(11,61,46,0.7)] backdrop-blur-xl shadow-lg shadow-black/20">
				{/* glossy sheen */}
				<div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />

				<div className="relative flex items-center justify-between px-4 py-3">
					<NavLink to="/" className="flex items-center gap-2">
						<img src="/earth.png" alt="logo" className="w-9 h-9" />
						<span style={{ fontFamily: "Pacifico" }} className="text-green-50 text-lg">
							EcoSphere
						</span>
					</NavLink>

					{/* Mobile Toggler */}
					<div className="lg:hidden flex items-center gap-4">
						{token && (
							<NavLink to="/profile" className="text-green-100 hover:text-lime-300">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</NavLink>
						)}
						<button onClick={() => setIsOpen(true)} className="text-green-100">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>

					{/* Desktop Nav */}
					<ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
						{navLinks.map((link) => (
							<li key={link.name}>
								<NavLink
									to={link.path}
									className={({ isActive }) =>
										isActive
											? "text-lime-300 font-semibold"
											: "text-green-100 hover:text-lime-300 transition-colors duration-200"
									}
								>
									{link.name}
								</NavLink>
							</li>
						))}
						{token ? (
							<li className="relative" ref={profileDropdownRef}>
								<button
									onClick={toggleProfileDropdown}
									className="flex items-center gap-1 text-green-100 hover:text-lime-300 transition duration-200"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									<svg
										className={`w-4 h-4 transition-transform duration-200 ${
											isProfileDropdownOpen ? "rotate-180" : ""
										}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>

								{/* Dropdown */}
								{isProfileDropdownOpen && (
									<div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg z-50 border border-white/15 bg-[rgba(11,61,46,0.92)] backdrop-blur-xl overflow-hidden">
										<ul className="py-1 text-sm text-green-100">
											<li>
												<NavLink
													to="/profile"
													onClick={() => setIsProfileDropdownOpen(false)}
													className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 hover:text-lime-300"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
														/>
													</svg>
													My Profile
												</NavLink>
											</li>
											<li>
												<NavLink
													to="/cart"
													onClick={() => setIsProfileDropdownOpen(false)}
													className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 hover:text-lime-300"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
														/>
													</svg>
													My Cart
												</NavLink>
											</li>
											<li>
												<NavLink
													to="/myorders"
													onClick={() => setIsProfileDropdownOpen(false)}
													className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 hover:text-lime-300"
												>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 8h14l1 12H4L5 8zm7-4a4 4 0 00-4 4v0a4 4 0 008 0v0a4 4 0 00-4-4z"
											/>
										</svg>
													My Orders
												</NavLink>
											</li>
											<hr className="border-white/10 my-1" />
											<li>
												<button
													onClick={() => {
														logout();
														setIsProfileDropdownOpen(false);
													}}
													className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-300 hover:bg-white/10 hover:text-red-300"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M17 16l4-4m0 0l-4-4m4 4H7"
														/>
													</svg>
													Logout
												</button>
											</li>
										</ul>
									</div>
								)}
							</li>
						) : (
							<>
								<li>
									<NavLink
										to="/login"
										className={({ isActive }) =>
											isActive ? "text-lime-300 font-semibold" : "text-green-100 hover:text-lime-300"
										}
									>
										Login
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/signup"
										className={({ isActive }) =>
											isActive ? "text-lime-300 font-semibold" : "text-green-100 hover:text-lime-300"
										}
									>
										Signup
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>

			{/* Mobile Drawer */}
			<div
				onClick={() => setIsOpen(false)}
				className={`fixed inset-0 z-40 bg-[#04150c]/60 transition-opacity duration-300 lg:hidden ${
					isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
			/>
			<div
				className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-[rgba(11,61,46,0.92)] backdrop-blur-xl border-l border-white/10 shadow-2xl transform transition-transform duration-300 lg:hidden ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<button
					onClick={() => setIsOpen(false)}
					className="absolute top-4 right-4 text-white hover:text-gray-200"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<ul className="flex flex-col gap-2 h-full overflow-y-auto no-scrollbar text-white text-base font-medium px-4 pt-16 pb-6">
						{navLinks.map((link) => {
							const Icon = link.icon;
							return (
								<li key={link.name}>
									<NavLink
										to={link.path}
										onClick={() => setIsOpen(false)}
										className={tileLinkClass}
									>
										<Icon className="w-5 h-5 flex-shrink-0" />
										{link.name}
									</NavLink>
								</li>
							);
						})}
						{token ? (
							<>
								<li>
									<NavLink
										to="/cart"
										onClick={() => setIsOpen(false)}
										className={tileLinkClass}
									>
										<ShoppingCart className="w-5 h-5 flex-shrink-0" />
										My Cart
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/myorders"
										onClick={() => setIsOpen(false)}
										className={tileLinkClass}
									>
										<Package className="w-5 h-5 flex-shrink-0" />
										My Orders
									</NavLink>
								</li>
								<li>
									<button
										onClick={() => {
											logout();
											setIsOpen(false);
										}}
										className="flex items-center gap-3 w-full rounded-xl px-4 py-3 bg-white/10 hover:bg-red-500/20 text-red-300 hover:text-red-300 transition-colors duration-150"
									>
										<LogOut className="w-5 h-5 flex-shrink-0" />
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<NavLink
										to="/login"
										onClick={() => setIsOpen(false)}
										className={tileLinkClass}
									>
										<LogIn className="w-5 h-5 flex-shrink-0" />
										Login
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/signup"
										onClick={() => setIsOpen(false)}
										className={tileLinkClass}
									>
										<UserPlus className="w-5 h-5 flex-shrink-0" />
										Signup
									</NavLink>
								</li>
							</>
						)}
					</ul>
			</div>
		</nav>
	);
}

export default Navbar;
