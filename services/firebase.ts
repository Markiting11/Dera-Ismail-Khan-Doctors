import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import type { Doctor } from '../types';

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const doctorsCollection = collection(db, 'doctors');

export const addDoctorToFirestore = async (doctor: Omit<Doctor, 'id'>) => {
  const docRef = await addDoc(doctorsCollection, doctor);
  return docRef.id;
};

export const updateDoctorInFirestore = async (id: string, doctor: Omit<Doctor, 'id'>) => {
  const docRef = doc(db, 'doctors', id);
  await setDoc(docRef, doctor, { merge: true });
};

export const deleteDoctorFromFirestore = async (id: string) => {
  const docRef = doc(db, 'doctors', id);
  await deleteDoc(docRef);
};

export const subscribeToDoctors = (callback: (doctors: Doctor[]) => void) => {
  return onSnapshot(doctorsCollection, (snapshot) => {
    const doctors: Doctor[] = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as Doctor));
    callback(doctors);
  });
};