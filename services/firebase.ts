import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, getDocs } from 'firebase/firestore';
import type { Doctor } from '../types';

// Firebase configuration - Demo setup (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDemo123456789",
  authDomain: "docfinder-demo.firebaseapp.com", 
  projectId: "docfinder-demo",
  storageBucket: "docfinder-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection reference
const doctorsCollection = collection(db, 'doctors');

// Real-time listener for doctors
export const subscribeTodoctors = (callback: (doctors: Doctor[]) => void) => {
  try {
    const q = query(doctorsCollection, orderBy('name'));
    
    return onSnapshot(q, (snapshot) => {
      const doctors: Doctor[] = [];
      snapshot.forEach((doc) => {
        doctors.push({
          id: doc.id,
          ...doc.data()
        } as Doctor);
      });
      callback(doctors);
    }, (error) => {
      console.warn('Firebase connection failed, using localStorage fallback:', error);
      // Fallback to localStorage if Firebase fails
      try {
        const savedDoctors = localStorage.getItem('docfinder_doctors');
        if (savedDoctors) {
          const parsedDoctors = JSON.parse(savedDoctors);
          callback(parsedDoctors);
        } else {
          // If no localStorage data, use initial doctors
          callback([]);
        }
      } catch (e) {
        console.error('Fallback localStorage error:', e);
        callback([]);
      }
    });
  } catch (error) {
    console.warn('Firebase initialization failed, using localStorage mode:', error);
    // Complete fallback - just use localStorage
    try {
      const savedDoctors = localStorage.getItem('docfinder_doctors');
      if (savedDoctors) {
        callback(JSON.parse(savedDoctors));
      }
    } catch (e) {
      console.error('localStorage fallback error:', e);
    }
    
    // Return empty unsubscribe function
    return () => {};
  }
};

// Add doctor to Firestore
export const addDoctorToFirestore = async (doctorData: Omit<Doctor, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(doctorsCollection, {
      ...doctorData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Doctor added to Firestore with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding doctor to Firestore:', error);
    throw error;
  }
};

// Update doctor in Firestore
export const updateDoctorInFirestore = async (doctor: Doctor): Promise<void> => {
  try {
    const docRef = doc(db, 'doctors', doctor.id);
    const { id, ...updateData } = doctor;
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('Doctor updated in Firestore:', doctor.id);
  } catch (error) {
    console.error('Error updating doctor in Firestore:', error);
    throw error;
  }
};

// Delete doctor from Firestore
export const deleteDoctorFromFirestore = async (doctorId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'doctors', doctorId);
    await deleteDoc(docRef);
    console.log('Doctor deleted from Firestore:', doctorId);
  } catch (error) {
    console.error('Error deleting doctor from Firestore:', error);
    throw error;
  }
};

// Initialize with sample data if collection is empty
export const initializeSampleData = async (sampleDoctors: Doctor[]): Promise<void> => {
  try {
    const q = query(doctorsCollection);
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log('Initializing Firestore with sample data...');
      for (const doctor of sampleDoctors) {
        const { id, ...doctorData } = doctor;
        await addDoc(doctorsCollection, {
          ...doctorData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      console.log('Sample data initialized in Firestore');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};