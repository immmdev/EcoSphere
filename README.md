# EcoSphere 🌍
### "Track Impact. Build Community. Create Green Change."

EcoSphere is an AI-powered sustainability platform that combines carbon tracking, personalized eco-guidance, habit formation with rewards, and skill monetization — making sustainable living simple, engaging, and rewarding for everyone.

![EcoSphere Banner](https://via.placeholder.com/800x200/4CAF50/FFFFFF?text=EcoSphere+-+Because+Green+Should+Pay+Off)

##  Problem Statement

While many people learn about climate change and want to contribute to sustainability, there's no single platform that provides:
- Personal impact tracking
- Personalized sustainability suggestions  
- Community building with like-minded individuals
- Skill monetization through eco-products
- Gamified habit formation

EcoSphere solves this by creating an all-in-one ecosystem for sustainable living.

##  Features

### 1. Carbon Footprint Tracker
- Track emissions from transport, electricity, food habits, and shopping
- Get AI-powered personalized reduction suggestions
- Monitor weekly/monthly improvement trends
- Earn badges and share achievements

### 2.  Eco-Communities + Green Initiatives
- **Live Communities**: Socket.IO-based real-time chat
- **Start/Join Initiatives**: 
  - Tree planting drives
  - Clean-up campaigns
  - Zero-waste challenges
  - Eco education workshops
- **Track Outcomes**: Trees planted, waste reduced, volunteer participation
- **Community Interaction**: Share progress, ask advice, discuss projects

### 3.  Eco Marketplace
- **Learn & Sell**: Handmade eco-products (upcycled crafts, organic soaps, etc.)
- **Tutorial Library**: Step-by-step DIY guides with videos
- **Categories**: Home Decor, Fashion, Utilities, Gifting
- **Seller Enablement**: How-to create products from waste materials

### 4. ♻ Recycle & Reuse Hub
- Video guides on waste sorting and composting
- Digital sustainability tips
- Community-driven reuse guides
- E-waste disposal information

### 5.  Gamification & Profiles
- Badge system for various achievements
- Personal timeline tracking
- Growth journey visualization
- Leaderboards and challenges

### 6.  Sustainability Learning Hub
- Curated educational content from NGOs and educators
- Weekly "Eco Hero" spotlight series
- Content filtering by topic and difficulty level
- School/college project resources

##  Tech Stack

### Frontend
- **React.js** - User interface
- **TailwindCSS** - Styling and responsive design
- **Socket.IO Client** - Real-time communication
- **ReactPlayer** - Video content playback
- **Chart.js** - Emission statistics visualization

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database for users, initiatives, products, emissions
- **JWT** - Secure authentication
- **Socket.IO Server** - Live chat functionality
- **Carbon Interface API** - Footprint calculation logic

### Storage & Media
- **Cloudinary/Firebase** - File and video storage
- **RESTful APIs** - Data management

liate partnerships and sponsored content

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/immmdev/ecosphere.git
cd ecosphere
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Environment Setup**
```bash
# Create .env file in backend directory
cp .env.example .env
```

Add your environment variables:

backend

PORT=4000

MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net"

CLOUDINARY_API_KEY="<your_cloudinary_api_key>"
CLOUDINARY_SECRET_KEY="<your_cloudinary_secret_key>"
CLOUDINARY_CLOUD_NAME="<your_cloudinary_cloud_name>"

JWT_SECRET="<your_jwt_secret>"

ADMIN_EMAIL="admin@ecosphere.com"
ADMIN_PASSWORD="<your_admin_password>"

STRIPE_SECRET_KEY="sk_test_<your_stripe_secret_key>"
GEMINI_API_KEY="<your_gemini_api_key>"

frontend
VITE_BACKEND_URL="http://localhost:4000"

```




4. **Run the application**
```bash
# Start backend server
cd backend
npm start

# Start frontend development server
cd frontend
npm start
```

5. **Access the application**
- Frontend: `http://localhost:5134`
- Backend API: `http://localhost:4000`

##  User Journey Example

1. **Sign Up** → Enter lifestyle data for emission tracking
2. **First Badge** → Earn "Green Beginner" badge
3. **Join Community** → Participate in "Plastic-Free July" initiative
4. **Create Initiative** → Start "Clean Up at Gomti River" event
5. **Learn & Create** → Watch DIY tutorials, craft eco-products
6. **Marketplace** → List handmade items for sale
7. **Achieve Growth** → Earn "Sustainability Creator" badge
8. **Inspire Others** → Share progress and motivate community

##  Contributing

We welcome contributions to make EcoSphere better! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  Impact Goals

| Area | Target Impact |
|------|---------------|
| **Personal** | Mindful habits, learning, gamified growth |
| **Community** | Real-world collaborative environmental action |
| **Commerce** | Sustainable product promotion and creator earnings |
| **Education** | Knowledge sharing through guides and tutorials |
| **Environment** | Measurable CO₂ reduction and waste reuse |

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Team

**Presenters:**
- Dev Singh
- Anubhav Dixit  
- Pranshu Shakya

##  Acknowledgments

- Yale Climate Communication studies for market research data
- Educational institutions supporting sustainability initiatives
- Open source community for tools and libraries
- Environmental organizations inspiring our mission

##  Author

CSE Student at **Institute of Engineering and Technology (IET), Lucknow)**
 Email: [myselfdevsingh123@gmail.com](mailto:myselfdevsingh123@gmail.com)  
 WhatsApp: [+91 7235898946](https://wa.me/917235898946)
 Website: [www.ecosphere.com](https://eco-sphere-v1.vercel.app/)

---

**Made with 💚 for a sustainable future**

*Because Green Should Pay Off* 🌱
