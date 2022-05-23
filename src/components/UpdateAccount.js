import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
/*
Firebase Hook 
Description: Open Source Code package on NPM
Author / Owner (s): Chris Bianca
Usage: Used for user authentication  
Online Download Link: https://www.npmjs.com/package/react-firebase-hooks
Other Information: License: https://github.com/csfrequency/react-firebase-hooks/blob/HEAD/LICENSE
*/
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./UpdateAccount.css";
import { useNavigate } from "react-router-dom";

import validator from "validator";
/*
Validator 
Description: Open Source Code package on NPM
Author / Owner (s): Chris O’Hara
Usage: Used to check emails and passwords  
Online Download Link: https://www.npmjs.com/package/validator
Other Information: Free to use under MIT License https://opensource.org/licenses/MIT
*/

function UpdateAccount() {
    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");

    //Creates an instance of the current user - you can get their uid and name from this
    const [user] = useAuthState(auth);
    const [currentName, setCurrentName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false); //sed to set the visiblity of change email
    const navigate = useNavigate();

    //checks whether the email is valid
    const handleEmail = (email) => {
        setNewEmail(email);

        if (validator.isEmail(email)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    };

    //on every change of the user or navigate variables, run this function and reload the component
    useEffect(() => {
        //sets current users name and email from firebase
        const fetchUserName = async () => {
            try {
                const snapshot = query(
                    collection(db, "users"),
                    where("uid", "==", user?.uid)
                );
                const doc = await getDocs(snapshot);
                setCurrentName(doc.docs[0].data().user);
                setCurrentEmail(doc.docs[0].data().email);
            } catch (err) {
                console.error(err);
            }
        };
        if (!user) navigate("/"); //if no user send to hompage
        fetchUserName();
    }, [user, navigate]);

    return (
        <div className="updateAccount">
            <h3>Update Account Information</h3>
            <div className="form">
                <input
                    type="text"
                    className="textbox"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={currentName}
                />
                {/* show button only if there is a names entered */}
                <button className="button" hidden={newName ? "" : "hidden"}>
                    Change Name
                </button>
            </div>
            <div className="form">
                <input
                    type="text"
                    className="textbox"
                    value={newEmail}
                    onChange={(e) => handleEmail(e.target.value)}
                    placeholder={currentEmail}
                />
                {/* show button only if there is a valid email entered */}
                <button
                    className="button"
                    hidden={newEmail && validEmail ? "" : "hidden"}
                >
                    Change Email
                </button>
            </div>
            <button className="button" onClick={logout}>
                Log Out
            </button>
        </div>
    );
}

export default UpdateAccount;
