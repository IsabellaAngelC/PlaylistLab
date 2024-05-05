const firebase = require('firebase/app');
import 'firebase/firestore';
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { collection, addDoc, getDocs } = require('firebase/firestore');
import { AddCards } from '../types/index';

const firebaseConfig = {
	apiKey: "AIzaSyDffwID4LqF-ElXZUIvC4G9pefvpsBUUfY",
	authDomain: "labsongs-af6b8.firebaseapp.com",
	projectId: "labsongs-af6b8",
	storageBucket: "labsongs-af6b8.appspot.com",
	messagingSenderId: "933852148339",
	appId: "1:933852148339:web:66e80a4045574e059df006",
	measurementId: "G-0D4NFXD6XV",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const addmusic = async (FormData: Omit<AddCards, 'id'>) => {
	console.log('form', FormData);
	try {
		const docRef = await addDoc(collection(db, 'Music'), FormData);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const getmusic = async () => {
	const querySnapshot = await getDocs(collection(db, 'Music'));
	const Arraysongs: Array<AddCards> = [];

	querySnapshot.forEach((doc: any) => {
		const data = doc.data() as any;
		Arraysongs.push({ id: doc.id, ...data });
	});
	console.log('get', Arraysongs);
	return Arraysongs;
};
