import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';

const productsCollection = collection(db, 'productos');

export const getAll = async () => {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getById = async (id) => {
    const docRef = doc(db, 'productos', id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const create = async (data) => {
    const docRef = await addDoc(productsCollection, data);
    return { id: docRef.id, ...data };
};

export const remove = async (id) => {
    const docRef = doc(db, 'productos', id);
    await deleteDoc(docRef);
    return true;
};
