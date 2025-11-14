# ✈️ OnWings.v2

A modern, full-featured flight booking web application built with React, Redux Toolkit, and Vite. OnWings provides an intuitive interface for searching flights, booking tickets, and managing reservations with stunning visual effects and smooth animations.

## 🌟 Features

### Flight Search & Booking
- **Advanced Flight Search** - Search flights by origin, destination, dates, and passenger count
- **Real-time Results** - Instant flight results with detailed information
- **Multi-step Booking Process** - Seamless booking flow with passenger details, seat selection, and payment
- **Seat Selection** - Interactive seat map for choosing preferred seats
- **Luggage Management** - Add and customize luggage options
- **Price Calculator** - Dynamic pricing with real-time updates

### User Experience
- **Authentication System** - Secure login and signup modals
- **Responsive Design** - Fully responsive across all device sizes
- **Beautiful UI** - Modern interface with Tailwind CSS
- **Smooth Animations** - Framer Motion powered transitions
- **Visual Effects** - Shader backgrounds and floating path animations
- **Loading States** - Custom flight loader animations

### Technical Features
- **State Management** - Redux Toolkit for centralized state management
- **Routing** - React Router DOM for navigation
- **Mock API** - Built-in mock API for development and testing
- **Date Handling** - Internationalized date picker with @ark-ui
- **Icon Library** - Lucide React icons throughout the app

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ganesh172919/OnWings.v2.git
cd OnWings.v2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
OnWings.v2/
├── public/              # Static assets
├── src/
│   ├── api/            # API and mock data services
│   │   └── mockApi.js
│   ├── assets/         # Images, fonts, and other assets
│   ├── components/     # Reusable React components
│   │   ├── auth/       # Authentication components
│   │   │   ├── LoginModal.jsx
│   │   │   └── SignupModal.jsx
│   │   ├── booking/    # Booking flow components
│   │   │   ├── LuggageInfo.jsx
│   │   │   ├── PassengerForm.jsx
│   │   │   ├── PaymentForm.jsx
│   │   │   ├── PriceSummary.jsx
│   │   │   └── SeatMap.jsx
│   │   ├── common/     # Shared components
│   │   │   ├── ArkDatePicker.jsx
│   │   │   ├── ExpandingGallery.jsx
│   │   │   ├── FlightLoader.jsx
│   │   │   ├── FlightTicket.jsx
│   │   │   ├── FloatingPaths.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ShaderBackground.jsx
│   │   │   └── WarpBackground.jsx
│   │   ├── flight/     # Flight search components
│   │   │   ├── FlightCard.jsx
│   │   │   └── FlightSearchForm.jsx
│   │   └── icons/      # Custom icon components
│   │       └── Icons.jsx
│   ├── data/           # Static data and mock datasets
│   │   ├── airports.js
│   │   └── mockFlights.js
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── FlightResultsPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── PaymentPage.jsx
│   │   └── ConfirmationPage.jsx
│   ├── store/          # Redux store and slices
│   │   ├── store.js
│   │   └── slices/
│   │       ├── bookingSlice.js
│   │       └── flightSlice.js
│   ├── styles/         # CSS and styling files
│   │   ├── FlightLoader.css
│   │   └── index.css
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── eslint.config.js    # ESLint configuration
```

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation
- **Framer Motion** - Animation library

### UI Components
- **@ark-ui/react** - Accessible UI components
- **Lucide React** - Icon library
- **@paper-design/shaders-react** - Shader effects

### Development
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixing

## 📱 Application Flow

1. **Home Page** - Search for flights with origin, destination, and dates
2. **Flight Results** - Browse available flights with details
3. **Booking Page** - Enter passenger details and select seats
4. **Payment Page** - Complete payment with secure form
5. **Confirmation** - View booking confirmation and ticket details

## 🎨 Key Features Details

### State Management
The application uses Redux Toolkit with organized slices:
- **Flight Slice** - Manages flight search and results
- **Booking Slice** - Handles booking process and passenger data

### Routing
The app uses React Router with the following routes:
- `/` - Home page with flight search
- `/flights` - Flight results page
- `/book/:flightId` - Booking page for specific flight
- `/payment` - Payment processing page
- `/confirmation/:bookingId` - Booking confirmation page

### Mock API
Built-in mock API simulates real backend responses for:
- Flight search
- Booking creation
- Payment processing
- Airport data retrieval

## 🔧 Configuration

### Vite Configuration
- Development server runs on port 5000
- HMR (Hot Module Replacement) enabled with WebSocket support
- Preview server configured for production testing

### Tailwind CSS
Configured with custom theme settings and plugins for enhanced styling capabilities.

## 🚦 Development Workflow

1. Make changes to components in the `src/` directory
2. Vite will automatically hot-reload your changes
3. Run `npm run lint` to check code quality
4. Build for production with `npm run build`
5. Test production build with `npm run preview`

## 📝 Environment Variables

The application currently uses mock data. For production, configure:
- API endpoints
- Payment gateway credentials
- Authentication services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and maintained by Ganesh172919.



## 🙏 Acknowledgments

- React team for the amazing library
- Vite for the blazing fast build tool
- Tailwind CSS for the utility-first framework
- All open-source contributors of the dependencies used

---

**Built with ❤️ using React and Vite**
