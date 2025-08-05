# DocFinder - Doctor Directory Application

A React-based web application for finding and managing doctor information. Users can search for doctors by name, specialty, or city, and administrators can add, edit, and delete doctor records.

## Features

- 🔍 **Search Doctors**: Search by doctor name, specialty, or city
- 👨‍⚕️ **Doctor Directory**: Browse all available doctors
- 🔐 **Admin Panel**: Add, edit, and delete doctor records (requires authentication)
- 💾 **Persistent Storage**: Data is saved locally using localStorage
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Mode**: Toggle between light and dark themes

## How to Add New Doctors

### Step 1: Access Admin Login
1. Open the application in your browser
2. Click on "Admin Login" in the top navigation bar
3. Or click on "Want to add doctors? Admin Login" if you see that text

### Step 2: Login
Use these credentials:
- **Username**: `admin`
- **Password**: `doctor123`

### Step 3: Add Doctor
1. After successful login, you'll see an "Add Doctor" link in the navigation
2. Click on "Add Doctor"
3. Fill out the form with the doctor's information:
   - **Doctor Name** (required)
   - **Specialty** (required)
   - **City** (required)
   - **Clinic Address** (required)
   - **Phone Number** (required)
   - **Working Hours** (required)
   - **Google Maps Link** (optional)
   - **WhatsApp Link** (optional)
4. Click "Add Doctor" to save

### Step 4: Verify
- The doctor will be added to the directory
- You'll see a success message
- The new doctor will appear in the main doctor list

## Development

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Technical Details

- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Storage**: localStorage for data persistence
- **Authentication**: Simple session-based authentication

## Troubleshooting

### Doctor Not Adding
If you're having trouble adding doctors:

1. **Check Authentication**: Make sure you're logged in as admin
2. **Fill Required Fields**: All required fields must be completed
3. **Check Console**: Open browser developer tools (F12) and check for any error messages
4. **Clear Browser Data**: If issues persist, try clearing localStorage and refreshing

### Login Issues
- Username: `admin`
- Password: `doctor123`
- Make sure you're using the correct credentials
- Check that the login form is submitting properly

## Data Management

- **Reset Data**: Admins can reset all data to initial sample doctors using the "Reset Data" button
- **Data Persistence**: All changes are automatically saved to localStorage
- **Data Export**: Currently, data is only stored locally in the browser

## Sample Data

The application comes with sample doctor data for various Pakistani cities including:
- Lahore
- Karachi  
- Islamabad
- Dera Ismail Khan

## License

This project is for educational and demonstration purposes.
