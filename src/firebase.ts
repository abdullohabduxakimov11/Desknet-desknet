import { localDb } from './services/localDb';

// Mock Firebase Config
export const firebaseConfig = {
  apiKey: "local-storage-mode",
  authDomain: "local",
  projectId: "local",
  storageBucket: "local",
  messagingSenderId: "local",
  appId: "local",
  measurementId: "local",
  firestoreDatabaseId: "local"
};

export const isFirebaseConfigured = true; // Always true in local mode

// Mock Auth and DB objects
export const auth = {
  currentUser: localDb.getCurrentUser(),
};

export const db = {
  type: 'local-db'
};

// Mock Functions to replace firebase/auth and firebase/firestore imports
export const signInWithEmailAndPassword = async (_auth: any, email: string, pass: string) => {
  const user = await localDb.signIn(email, pass);
  return { user };
};

export const createUserWithEmailAndPassword = async (_auth: any, email: string, pass: string) => {
  const user = await localDb.signUp(email, pass, 'client'); // Default to client
  return { user };
};

export const onAuthStateChanged = (_auth: any, callback: (user: any) => void) => {
  const user = localDb.getCurrentUser();
  callback(user);
  return () => {}; // Unsubscribe
};

export const signOut = async (_auth: any) => {
  localDb.signOut();
};

export const collection = (_db: any, name: string) => name;
export const doc = (...args: any[]) => {
  let col, id;
  if (args.length === 1) {
    // doc(collectionRef)
    col = args[0];
    id = Math.random().toString(36).substring(7);
  } else if (args.length === 2) {
    // doc(db, path) or doc(collectionRef, id)
    if (typeof args[0] === 'string') {
      col = args[0];
      id = args[1];
    } else {
      col = args[0];
      id = args[1];
    }
  } else {
    // doc(db, col, id)
    col = args[1];
    id = args[2];
  }
  return { col, id };
};
export const query = (col: string, ...constraints: any[]) => ({ col, constraints });
export const where = (..._args: any[]) => ({ type: 'where', args: _args });
export const orderBy = (..._args: any[]) => ({ type: 'orderBy', args: _args });
export const limit = (n: number) => ({ type: 'limit', value: n });

export const getDoc = async (docRef: any) => {
  return await localDb.getDoc(docRef.col, docRef.id);
};

export const getDocs = async (q: any) => {
  // q is either collectionName or a query object (which we mock as collectionName)
  const colName = typeof q === 'string' ? q : q.col;
  const constraints = q.constraints || [];
  const data = await localDb.getDocs(colName, constraints);
  return {
    docs: data.map(item => ({
      id: item.id || item.uid,
      data: () => item
    }))
  };
};

export const setDoc = async (docRef: any, data: any, options?: any) => {
  await localDb.setDoc(docRef.col, docRef.id, data, options);
};

export const addDoc = async (colName: string, data: any) => {
  return await localDb.addDoc(colName, data);
};

export const updateDoc = async (docRef: any, data: any) => {
  await localDb.updateDoc(docRef.col, docRef.id, data);
};

export const deleteDoc = async (docRef: any) => {
  await localDb.deleteDoc(docRef.col, docRef.id);
};

export const onSnapshot = (q: any, callback: (snapshot: any) => void) => {
  const colName = typeof q === 'string' ? q : q.col;
  const constraints = q.constraints || [];
  return localDb.onSnapshot(colName, (data) => {
    callback({
      docs: data.map(item => ({
        id: item.id || item.uid,
        data: () => item
      }))
    });
  }, constraints);
};

export const serverTimestamp = () => new Date().toISOString();

export default { auth, db };

