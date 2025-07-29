import type { Doctor } from '../types';

// Sample doctors data for Pakistani cities
export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc1',
    name: 'Dr. Muhammad Ahmed Khan',
    specialty: 'Cardiologist',
    city: 'Lahore',
    address: 'Gulberg Medical Center, Block M, Gulberg III, Lahore',
    phone: '+92-42-35714000',
    workingHours: 'Mon-Fri: 9:00 AM - 5:00 PM, Sat: 10:00 AM - 2:00 PM',
    gmbLink: 'https://goo.gl/maps/example-lahore-cardiologist',
    whatsappLink: 'https://wa.me/923001234567'
  },
  {
    id: 'doc2',
    name: 'Dr. Fatima Sheikh',
    specialty: 'Pediatrician',
    city: 'Karachi',
    address: 'Clifton Medical Center, Block 4, Clifton, Karachi',
    phone: '+92-21-35831234',
    workingHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
    gmbLink: 'https://goo.gl/maps/example-karachi-pediatrician'
  },
  {
    id: 'doc3',
    name: 'Dr. Ali Hassan',
    specialty: 'Dentist',
    city: 'Islamabad',
    address: 'F-8 Dental Clinic, Jinnah Super Market, F-8 Markaz, Islamabad',
    phone: '+92-51-2651234',
    workingHours: 'Mon-Fri: 10:00 AM - 8:00 PM, Sat-Sun: 11:00 AM - 4:00 PM',
    gmbLink: 'https://goo.gl/maps/example-islamabad-dentist',
    whatsappLink: 'https://wa.me/923219876543'
  },
  {
    id: 'doc4',
    name: 'Dr. Ayesha Malik',
    specialty: 'Dermatologist',
    city: 'Dera Ismail Khan',
    address: 'City Hospital, Bannu Road, Dera Ismail Khan',
    phone: '+92-966-750123',
    workingHours: 'Mon-Thu: 9:00 AM - 5:00 PM, Fri-Sat: 10:00 AM - 3:00 PM',
    gmbLink: 'https://goo.gl/maps/example-dik-dermatologist'
  },
  {
    id: 'doc5',
    name: 'Dr. Imran Yousaf',
    specialty: 'Orthopedic Surgeon',
    city: 'Dera Ismail Khan',
    address: 'DHQ Hospital, Circular Road, Dera Ismail Khan',
    phone: '+92-966-755678',
    workingHours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    gmbLink: 'https://goo.gl/maps/example-dik-orthopedic',
    whatsappLink: 'https://wa.me/923456789012'
  },
  {
    id: 'doc6',
    name: 'Dr. Sana Rehman',
    specialty: 'Gynecologist',
    city: 'Dera Ismail Khan',
    address: 'Women Care Clinic, Tank Road, Dera Ismail Khan',
    phone: '+92-966-752468',
    workingHours: 'Mon-Sat: 9:00 AM - 6:00 PM',
    gmbLink: 'https://goo.gl/maps/example-dik-gynecologist'
  }
];

// Simple filter function that searches by name, specialty, and city
export const filterDoctors = async (query: string, doctors: Doctor[]): Promise<Doctor[]> => {
  // Simulate a small delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!query.trim()) {
    return doctors;
  }

  const searchTerm = query.toLowerCase().trim();
  
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm) ||
    doctor.specialty.toLowerCase().includes(searchTerm) ||
    doctor.city.toLowerCase().includes(searchTerm) ||
    doctor.address.toLowerCase().includes(searchTerm)
  );
};