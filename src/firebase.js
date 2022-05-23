import firebase from "firebase/compat/app";
/*
Firebase 
Description: Open Source Code package on NPM
Author / Owner (s): Google 
Usage: Storing Data on Locations and Accounts 
Online Download Link: https://www.npmjs.com/package/firebase
*/

import "firebase/compat/auth";
/*
Firebase 
Description: Open Source Code package on NPM
Author / Owner (s): Google 
Usage: Storing Data on Locations and Accounts 
Online Download Link: https://www.npmjs.com/package/firebase
*/

import "firebase/compat/firestore";
import {
    doc,
    collection,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
/*
Firebase 
Description: Open Source Code package on NPM
Author / Owner (s): Google 
Usage: Storing Data on Locations and Accounts 
Online Download Link: https://www.npmjs.com/package/firebase
*/

//config for firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
//const timestamp = firebase.firestore.Timestamp.now().seconds;

//creates a new food bank by creating a new document in the firebase database
const addNewPantry = async (name, location, foodList, quantity) => {
    const user = firebase.auth().currentUser;
    const quer = query(collection(db, "users"), where("uid", "==", user?.uid));
    const snapshot = await getDocs(quer);
    const owner = snapshot.docs[0].data().user;
    await setDoc(doc(db, "banks", name), {
        uid: user.uid,
        owner: owner,
        name: name,
        location: location,
        foodList: foodList,
        quantity: quantity,
    });
};

//creates a new user by creating a new document in the firebase database
const userRegistration = async (name, email, password) => {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        await db.collection("users").add({
            uid: user.uid,
            user: name,
            authProvide: "local",
            email,
        });
    } catch (err) {
        alert(err.message);
    }
};

//logs in a user by using their email and password
const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
    }
};

//sends password reset email to user
const resetPassword = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
    } catch (err) {
        alert(err.message);
    }
};

//logs user out
const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithEmailAndPassword,
    userRegistration,
    resetPassword,
    logout,
    addNewPantry,
};
export default firebase;
