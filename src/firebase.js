import firebase from 'firebase/compat/app';
//import { collection, addDoc, where, query, getDocs } from "firebase/firestore";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { doc, collection, getDocs, query, setDoc, where } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCpeVqTNwqDGO9mRZYRd8KFlui8SaXZ4Ik",
    authDomain: "pantry-9ed2a.firebaseapp.com",
    projectId: "pantry-9ed2a",
    storageBucket: "pantry-9ed2a.appspot.com",
    messagingSenderId: "983976649962",
    appId: "1:983976649962:web:eea94a444b768e2befe393",
    measurementId: "G-L72Q2YHSTQ"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
//const timestamp = firebase.firestore.Timestamp.now().seconds;

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

const addNewPantry = async (name, location, foodList, quantity) => {
  const user = firebase.auth().currentUser;
  const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  const snapshot = await getDocs(q);
  const owner = snapshot.docs[0].data().user;
  await setDoc(doc(db, "banks", name), {
    uid: user.uid,
    owner: owner,
    name: name,
    location: location,
    foodList: foodList,
    quantity: quantity
  });
}

const userRegistration = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      user: name, 
      authProvide: "local",
      email,
    });
  } catch(err) {
    alert (err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err.message);
  }
};

const resetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (err) {
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export { auth, db, signInWithEmailAndPassword, userRegistration, resetPassword, logout, addNewPantry };
export default firebase;