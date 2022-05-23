import React, { useEffect, useState } from "react";
import FoodBank from "./components/FoodBank";
import NewPantry from "./components/NewPantry";
import UpdateAccount from "./components/UpdateAccount";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
/*
Firebase 
Description: Open Source Code package on NPM
Author / Owner (s): Google 
Usage: Storing Data on Locations and Accounts 
Online Download Link: https://www.npmjs.com/package/firebase
*/

import { useAuthState } from "react-firebase-hooks/auth";
/*
Firebase Hook 
Description: Open Source Code package on NPM
Author / Owner (s): Chris Bianca
Usage: Used for user authentication  
Online Download Link: https://www.npmjs.com/package/react-firebase-hooks
Other Information: License: https://github.com/csfrequency/react-firebase-hooks/blob/HEAD/LICENSE
*/

import "./Account.css";

function Account() {
    const [banks, setBanks] = useState([]);

    //Creates an instance of the current user - you can get their uid and name from this
    const [user, loading] = useAuthState(auth);

    //runs on load and every time the user changes
    useEffect(() => {
        const getUserBanks = async () => {
            try {
                const snapshot = query(
                    collection(db, "banks"),
                    where("uid", "==", user?.uid)
                );
                const doc = await getDocs(snapshot);
                setBanks(doc.docs.map((doc) => doc.data()));
            } catch (err) {
                console.error(err);
                alert("An error occured while fetching user data");
            }
        };
        if (loading) return;
        getUserBanks();
    }, [user, loading]);

    return (
        <div className="account">
            <div>
                <h2 className="title">Account</h2>
                <hr />
                <div>
                    <UpdateAccount />
                </div>
                <hr />
                <div>
                    <h3 className="sub-title">Your Locations</h3>
                    <br />
                    <hr />
                    {/* creates a new food bank for each bank from firebase */}
                    {banks?.map((bank, index) => (
                        <FoodBank
                            className="bank"
                            key={index}
                            uid={bank.uid}
                            owner={bank.owner}
                            name={bank.name}
                            location={bank.location}
                            quantity={bank.quantity}
                            foodList={bank.foodList}
                        />
                    ))}
                </div>
                <br></br>
                <div>
                    <NewPantry />
                </div>
            </div>
        </div>
    );
}

export default Account;
