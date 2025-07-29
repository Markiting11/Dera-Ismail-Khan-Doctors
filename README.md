# 🏥 DocFinder - AI-Powered Doctor Search Platform

A modern healthcare application built with React and TypeScript that helps patients find and connect with doctors in Pakistan. Features include intelligent search, Google Maps integration, WhatsApp connectivity, and an admin panel for doctor management.

![DocFinder](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.0-green)

## 🎯 Features Implemented

### 📱 Main App Features
1. **Homepage** - Beautiful landing page with search functionality
2. **Doctor List** - Search results with filter options
3. **Doctor Detail Page** - Complete profile with contact info
4. **Admin Panel** - Add, edit, delete doctors

### 🔧 Key Functionalities
- **🔍 Smart Search** - Search by doctor name, specialty, or city
- **📍 Google Maps Integration** - GMB links directly open Google Maps
- **📱 Responsive Design** - Works perfectly on mobile and desktop
- **👨‍💼 Admin Management** - Easy doctor management system
- **⚡ Real-time Search** - Results update as you type
- **💬 WhatsApp Integration** - Direct chat links to doctors

### 📊 Sample Data
- 6 sample doctors from different Pakistani cities
- Lahore, Karachi, Islamabad, and Dera Ismail Khan
- Various specialties: Cardiologist, Dentist, Pediatrician, Dermatologist, Orthopedic Surgeon, Gynecologist

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or setup the project**
   ```bash
   git clone <repository-url>
   cd docfinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   - Navigate to `http://localhost:5173`
   - The app should load with the DocFinder homepage

## 🎮 Usage Guide

### For Patients (Public Users)

1. **Search for Doctors**
   - Use the search bar on the homepage
   - Search by doctor name, specialty, or city
   - Example searches: "cardiologist", "Dr. Ahmed", "Lahore"

2. **View Doctor Details**
   - Click "Details" button on any doctor card
   - View complete profile information
   - See working hours, contact details, and address

3. **Contact Doctors**
   - Click "Profile" to open Google Maps location
   - Use WhatsApp button (if available) for direct chat
   - Call using the provided phone numbers

### For Administrators

1. **Login to Admin Panel**
   - Click "Admin Login" in the header
   - Use credentials: `username: admin`, `password: doctor123`

2. **Add New Doctors**
   - Navigate to "Add Doctor" after login
   - Fill in all required information
   - Include Google Maps link and optional WhatsApp link

3. **Manage Existing Doctors**
   - Edit or delete doctors from the main page
   - Use the Edit/Delete buttons visible only to admin users

## 🏗️ Project Structure

```
docfinder/
├── src/
│   ├── App.tsx              # Main application component
│   ├── types.ts             # TypeScript type definitions
│   ├── index.tsx            # Application entry point
│   └── services/
│       └── geminiService.ts # Data service and search functionality
├── public/
├── index.html               # HTML template with Tailwind CSS
├── index.css               # Custom styles and fonts
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # Project documentation
```

## 🔧 Technology Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Routing**: React Router DOM 7.7.1
- **Build Tool**: Vite 6.2.0
- **Icons**: Custom SVG icons
- **State Management**: React Context API
- **Authentication**: Simple session-based admin auth

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional healthcare design
- **Dark Mode Ready**: Styled for both light and dark themes
- **Mobile First**: Responsive design that works on all devices
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Professional Typography**: Inter font family for excellent readability

## 📝 Sample Data Structure

```typescript
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  city: string;
  address: string;
  phone: string;
  workingHours: string;
  gmbLink: string;
  whatsappLink?: string;
}
```

## 🔐 Admin Credentials

**Username**: `admin`  
**Password**: `doctor123`

## 🚀 Next Steps & Enhancements

### Database Integration
Currently uses in-memory data. Consider integrating:
- Firebase Firestore for real-time data
- PostgreSQL with Prisma for structured data
- MongoDB for flexible document storage

### Enhanced Features
1. **Reviews & Ratings System**
   - Patient reviews and star ratings
   - Review moderation system

2. **Appointment Booking**
   - Calendar integration
   - Time slot management
   - Email/SMS notifications

3. **Advanced Search**
   - Filter by insurance accepted
   - Distance-based search
   - Availability filtering

4. **Doctor Profiles**
   - Photo uploads
   - Detailed specialization info
   - Education and certification details

### Technical Improvements
- Add proper error handling and loading states
- Implement real Google My Business API integration
- Add automated testing suite
- Set up CI/CD pipeline
- Add monitoring and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ for the Pakistani healthcare community**
