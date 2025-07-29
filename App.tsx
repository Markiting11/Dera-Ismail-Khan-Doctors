
import React, { useState, useContext, createContext, useCallback, useMemo, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet, useParams } from 'react-router-dom';
import type { Doctor } from './types';
import { INITIAL_DOCTORS, filterDoctors } from './services/geminiService';

// --- ICONS --- //
const IconProps = {
  className: "w-5 h-5 inline-block mr-2 text-slate-500 dark:text-slate-400",
};

const StethoscopeIcon = () => (
  <svg {...IconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9.75v3.75m3-2.25v1.5m-6.036-7.464l-.536.536M15.036 7.536l.536.536" />
  </svg>
);
const LocationIcon = () => (
  <svg {...IconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);
const PhoneIcon = () => (
    <svg {...IconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
    </svg>
);
const ClockIcon = () => (
    <svg {...IconProps} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0V6.75A.75.75 0 0 1 14.25 6h1.5a.75.75 0 0 1 .75.75v1.5m-4.5 0h4.5" />
  </svg>
);
const WhatsappIcon = ({ className = "w-4 h-4 mr-2"}: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.6C8.75 21.39 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 3.67C16.56 3.67 20.28 7.39 20.28 11.91C20.28 16.43 16.56 20.15 12.04 20.15C10.46 20.15 8.96 19.74 7.68 19L7.33 18.8L3.91 19.74L4.87 16.41L4.66 16.05C3.89 14.65 3.46 13.09 3.46 11.91C3.46 7.39 7.18 3.67 12.04 3.67M9.25 7.64C9.12 7.64 8.91 7.7 8.71 7.91C8.5 8.11 7.96 8.62 7.96 9.68C7.96 10.74 8.73 11.73 8.85 11.89C8.97 12.04 10.44 14.38 12.68 15.28C14.54 16.03 14.96 15.86 15.28 15.81C15.84 15.72 16.63 15.14 16.85 14.5C17.07 13.86 17.07 13.33 16.95 13.21C16.83 13.09 16.65 13.03 16.35 12.88C16.05 12.73 14.89 12.18 14.67 12.1C14.45 12.02 14.31 11.98 14.17 12.22C14.03 12.46 13.56 13.03 13.43 13.19C13.29 13.35 13.16 13.38 12.89 13.23C12.16 12.82 11.12 12.21 9.94 11.14C9.07 10.4 8.54 9.53 8.42 9.35C8.3 9.17 8.42 9.06 8.54 8.95C8.65 8.85 8.78 8.69 8.91 8.55C9.04 8.41 9.09 8.31 9.21 8.11C9.33 7.91 9.27 7.76 9.25 7.64Z" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);
const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


// --- CONTEXT --- //
interface DoctorContextType {
  doctors: Doctor[];
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (updatedDoctor: Doctor) => void;
  deleteDoctor: (id: string) => void;
  resetToInitialData: () => void;
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  getDoctorById: (id: string) => Doctor | undefined;
}
const DoctorContext = createContext<DoctorContextType | null>(null);

const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    // Load doctors from localStorage, fallback to INITIAL_DOCTORS
    const savedDoctors = localStorage.getItem('docfinder_doctors');
    if (savedDoctors) {
      try {
        return JSON.parse(savedDoctors);
      } catch (error) {
        console.error('Error parsing saved doctors:', error);
        return INITIAL_DOCTORS;
      }
    }
    return INITIAL_DOCTORS;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });

  // Save doctors to localStorage whenever doctors array changes
  useEffect(() => {
    localStorage.setItem('docfinder_doctors', JSON.stringify(doctors));
  }, [doctors]);

  const login = useCallback((user: string, pass: string): boolean => {
    if (user === 'admin' && pass === 'doctor123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
  }, []);

  const addDoctor = useCallback((doctorData: Omit<Doctor, 'id'>) => {
    setDoctors((prev) => [
      ...prev,
      { ...doctorData, id: `doc${Date.now()}` }
    ]);
  }, []);

  const updateDoctor = useCallback((updatedDoctor: Doctor) => {
    setDoctors(prev => prev.map(doc => doc.id === updatedDoctor.id ? updatedDoctor : doc));
  }, []);

  const deleteDoctor = useCallback((id: string) => {
    setDoctors(prev => prev.filter(doc => doc.id !== id));
  }, []);

  const getDoctorById = useCallback((id: string) => {
    return doctors.find(doc => doc.id === id);
  }, [doctors]);

  const resetToInitialData = useCallback(() => {
    if (window.confirm('🔄 Are you sure you want to reset all data to initial sample doctors? This will delete all custom doctors you have added.')) {
      // Clear localStorage to ensure clean reset
      localStorage.removeItem('docfinder_doctors');
      setDoctors(INITIAL_DOCTORS);
      alert('✅ Data has been reset to initial sample doctors!');
    }
  }, []);

  const value = useMemo(() => ({
      doctors,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      resetToInitialData,
      isAuthenticated,
      login,
      logout,
      getDoctorById
  }), [doctors, addDoctor, updateDoctor, deleteDoctor, resetToInitialData, isAuthenticated, login, logout, getDoctorById]);

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
};

// --- ROUTING --- //
const ProtectedRoute = () => {
    const { isAuthenticated } = useDoctors();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

// --- COMPONENTS --- //
const Header: React.FC = () => {
    const { isAuthenticated, logout, resetToInitialData } = useDoctors();
    const navigate = useNavigate();
    const location = useLocation();
    
    const getLinkClass = (path: string) => {
        return location.pathname === path 
            ? 'bg-primary text-white' 
            : 'text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-700';
    };
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md sticky top-0 z-20">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">DocFinder</h1>
                </Link>
                <div className="flex items-center space-x-2">
                    <Link to="/" className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${getLinkClass('/')}`}>
                        Find a Doctor
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/admin" className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${getLinkClass('/admin')}`}>
                                Add Doctor
                            </Link>
                            <button onClick={resetToInitialData} className="px-3 py-2 rounded-md font-semibold bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200 text-sm">
                                Reset Data
                            </button>
                            <button onClick={handleLogout} className="px-4 py-2 rounded-md font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors duration-200">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${getLinkClass('/login')}`}>
                            Admin Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-full shadow-lg p-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by doctor name, specialty, or city (e.g. 'Dr Ali', 'Cardiologist', 'Lahore')"
        className="w-full bg-transparent p-3 text-slate-700 dark:text-slate-200 focus:outline-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center bg-primary hover:bg-primary-dark disabled:bg-slate-400 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : "Search"}
      </button>
    </form>
  );
};

interface DoctorCardProps {
    doctor: Doctor;
    onViewDetails: (doctor: Doctor) => void;
}
const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onViewDetails }) => {
    const { isAuthenticated, deleteDoctor } = useDoctors();

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
            deleteDoctor(doctor.id);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
            <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-primary dark:text-primary-light">{doctor.name}</h3>
                <div className="mt-2 text-slate-600 dark:text-slate-300">
                    <p className="flex items-center"><StethoscopeIcon />{doctor.specialty}</p>
                    <p className="flex items-center mt-1"><LocationIcon />{doctor.city}</p>
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="flex flex-col space-y-2">
                    <div className={`grid gap-2 ${doctor.gmbLink ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        <button 
                            onClick={() => onViewDetails(doctor)}
                            className="flex items-center justify-center bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Details
                        </button>
                        {doctor.gmbLink && (
                            <a 
                                href={doctor.gmbLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                Profile <ExternalLinkIcon />
                            </a>
                        )}
                        {doctor.whatsappLink && (
                             <a 
                                href={doctor.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${doctor.gmbLink ? 'col-span-2' : 'col-span-1'} flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}
                            >
                                <WhatsappIcon className="w-5 h-5 mr-2" /> WhatsApp
                            </a>
                        )}
                    </div>
                     {isAuthenticated && (
                        <div className="flex space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                             <Link to={`/admin/edit/${doctor.id}`} className="flex-1 flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <EditIcon /> Edit
                            </Link>
                            <button onClick={handleDelete} className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                                <DeleteIcon /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface DoctorDetailModalProps {
    doctor: Doctor | null;
    onClose: () => void;
}
const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-30" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 max-w-lg w-full m-4 relative transform transition-all duration-300" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h2 className="text-3xl font-bold text-primary dark:text-primary-light mb-4">{doctor.name}</h2>
                <div className="space-y-3 text-slate-700 dark:text-slate-300">
                    <p className="flex items-center text-lg"><StethoscopeIcon /> <span className="font-semibold mr-2">Specialty:</span> {doctor.specialty}</p>
                    <p className="flex items-center"><LocationIcon /> <span className="font-semibold mr-2">Address:</span> {doctor.address}</p>
                    <p className="flex items-center"><PhoneIcon /> <span className="font-semibold mr-2">Phone:</span> {doctor.phone}</p>
                    <p className="flex items-center"><ClockIcon /> <span className="font-semibold mr-2">Hours:</span> {doctor.workingHours}</p>
                    {doctor.whatsappLink && (
                        <p className="flex items-center"><WhatsappIcon className="w-5 h-5 mr-2 text-green-500" /> <span className="font-semibold mr-2">WhatsApp:</span> <a href={doctor.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Click to Chat</a></p>
                    )}
                </div>
                {doctor.gmbLink && (
                    <div className="mt-6">
                         <a 
                            href={doctor.gmbLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                            Open in Google <ExternalLinkIcon />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- PAGES --- //
const HomePage: React.FC = () => {
  const { doctors } = useDoctors();
  const [searchResults, setSearchResults] = useState<Doctor[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchResults(null);
    try {
      if (!query.trim()) {
        setSearchResults(null);
      } else {
        // Always get fresh doctors data
        const currentDoctors = doctors;
        console.log('🔍 Searching in doctors:', currentDoctors.length, 'doctors found');
        console.log('🔍 Search query:', query);
        const results = await filterDoctors(query, currentDoctors);
        console.log('🔍 Search results:', results.length, 'doctors matched');
        setSearchResults(results);
      }
    } catch (e) {
      setError('An error occurred during search. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [doctors]);
  
  const displayDoctors = searchResults ?? doctors;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
          Find Your Doctor
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Search by doctor name, medical specialty, or city to find the perfect healthcare provider for your needs.
        </p>
        <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          📊 {doctors.length} doctors available • Data saved permanently
        </div>
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          💡 Try searching: "Dr Ali", "Cardiologist", "Lahore", "Dentist", etc.
        </div>
        {/* Debug info for troubleshooting */}
        <div className="mt-2 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 p-2 rounded">
          🔧 Debug: {doctors.map(d => d.name).join(', ')}
        </div>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      
      <div className="mt-12">
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <SpinnerIcon />
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!isLoading && !error && (
            displayDoctors.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayDoctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} onViewDetails={setSelectedDoctor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">No Doctors Found</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        {searchResults ? "Your search did not match any doctors." : "There are no doctors in the directory."}
                    </p>
                </div>
            )
        )}
      </div>

      <DoctorDetailModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </div>
  );
};

interface DoctorFormProps {
    mode: 'add' | 'edit';
}
const DoctorForm: React.FC<DoctorFormProps> = ({ mode }) => {
    const { addDoctor, updateDoctor, getDoctorById } = useDoctors();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const doctorToEdit = useMemo(() => {
        if (mode === 'edit' && id) {
            return getDoctorById(id);
        }
        return null;
    }, [id, mode, getDoctorById]);

    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        city: 'Dera Ismail Khan',
        address: '',
        phone: '',
        workingHours: '',
        gmbLink: '',
        whatsappLink: ''
    });

    useEffect(() => {
        if (doctorToEdit) {
            setFormData({
                name: doctorToEdit.name,
                specialty: doctorToEdit.specialty,
                city: doctorToEdit.city,
                address: doctorToEdit.address,
                phone: doctorToEdit.phone,
                workingHours: doctorToEdit.workingHours,
                gmbLink: doctorToEdit.gmbLink,
                whatsappLink: doctorToEdit.whatsappLink || ''
            });
        }
    }, [doctorToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = { ...formData };
        if (!finalData.whatsappLink) {
            delete finalData.whatsappLink; // Ensure optional field is not an empty string
        }
        if (!finalData.gmbLink) {
            delete finalData.gmbLink; // Ensure optional Google Maps link is not an empty string
        }
        
        if (mode === 'edit' && doctorToEdit) {
            updateDoctor({ ...doctorToEdit, ...finalData });
            alert('✅ Doctor updated successfully! Data has been saved permanently.');
        } else {
            addDoctor(finalData);
            alert('✅ Doctor added successfully! Data has been saved permanently.');
        }
        // Clear form
        setFormData({
            name: '',
            specialty: '',
            city: 'Dera Ismail Khan',
            address: '',
            phone: '',
            workingHours: '',
            gmbLink: '',
            whatsappLink: ''
        });
        navigate('/');
    };
    
    const inputClass = "w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition";

    if (mode === 'edit' && !doctorToEdit) {
        return <div className="text-center py-10">Doctor not found.</div>;
    }

    return (
        <div className="container mx-auto px-6 py-8 max-w-2xl">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">
                    {mode === 'edit' ? 'Edit Doctor' : 'Add a New Doctor'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Doctor Name</label>
                        <input type="text" name="name" onChange={handleChange} value={formData.name} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Specialty</label>
                        <input type="text" name="specialty" onChange={handleChange} value={formData.specialty} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">City</label>
                        <input type="text" name="city" onChange={handleChange} value={formData.city} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Clinic Address</label>
                        <input type="text" name="address" onChange={handleChange} value={formData.address} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                        <input type="text" name="phone" onChange={handleChange} value={formData.phone} className={inputClass} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Working Hours</label>
                        <input type="text" name="workingHours" onChange={handleChange} value={formData.workingHours} className={inputClass} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Google Maps Link (Optional)</label>
                        <input type="url" name="gmbLink" onChange={handleChange} value={formData.gmbLink} className={inputClass} placeholder="e.g. https://goo.gl/maps/example" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">WhatsApp Link (Optional)</label>
                        <input type="url" name="whatsappLink" onChange={handleChange} value={formData.whatsappLink} className={inputClass} placeholder="e.g. https://wa.me/923001234567" />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        {mode === 'edit' ? 'Save Changes' : 'Add Doctor'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const LoginPage: React.FC = () => {
    const { login } = useDoctors();
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (login(username, password)) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-800 p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Admin Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username-address" className="sr-only">Username</label>
                            <input
                                id="username-address"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-slate-100 dark:bg-slate-700"
                                placeholder="Username"
                                aria-label="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-slate-100 dark:bg-slate-700"
                                placeholder="Password"
                                aria-label="Password"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center" role="alert">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- APP --- //
function App() {
  return (
    <DoctorProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<DoctorForm mode="add" />} />
              <Route path="/admin/edit/:id" element={<DoctorForm mode="edit" />} />
            </Route>
          </Routes>
        </main>
        <footer className="bg-slate-200 dark:bg-slate-800 py-4 mt-8">
            <div className="container mx-auto px-6 text-center text-slate-600 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} DocFinder. All rights reserved.</p>
            </div>
        </footer>
      </div>
    </DoctorProvider>
  );
}

export default App;