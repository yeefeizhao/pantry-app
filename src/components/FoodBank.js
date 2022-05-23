import { deleteDoc, doc, setDoc } from "firebase/firestore";
/*
Firebase 
Description: Open Source Code package on NPM
Author / Owner (s): Google 
Usage: Storing Data on Locations and Accounts 
Online Download Link: https://www.npmjs.com/package/firebase
*/

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
import { auth, db } from "../firebase";
import "./FoodBank.css";

function FoodBank({ uid, owner, name, location, foodList, quantity }) {
    const [editing, setEditing] = useState(false); //state for whether to display input fields or not
    const [owned, setOwned] = useState(false); //state for whether the current user's uid matches the foodbanks uid, if it does then set owned to true and the edit button it visible
    const [user] = useAuthState(auth); //used to get the current user

    //states for the input fields for the foodbank
    const [newLocation, setNewLocation] = useState(location);
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [newFoodList, setNewFoodList] = useState(foodList);

    //reloads and updates the owned state when there is a change in user or uid
    useEffect(() => {
        //sets whether the user owns this food bank
        if (!user) setOwned(false);
        else if (user.uid === uid) setOwned(true);
    }, [user, uid]);

    //update the document for this food bank in firebase
    const updateBank = async () => {
        //catches for if fields are not filled out
        const docRef = doc(db, "banks", name);
        await setDoc(
            docRef,
            {
                location: newLocation,
                foodList: newFoodList,
                quantity: newQuantity,
            },
            { merge: true }
        );
        setEditing(false);
        window.location.reload();
    };

    //delete the document for this food bank from firebase
    const deleteBank = async () => {
        const docRef = doc(db, "banks", name);
        await deleteDoc(docRef);
        window.location.reload();
    };

    return (
        <div className="foodbank container">
            <div className="card-group">
                <div className="card border-primary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        {/* if the user clicks edit, then show the input field, else show the current address */}
                        {editing ? (
                            <input
                                type="text"
                                className="textbox"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                                placeholder="Address"
                            />
                        ) : (
                            <h6 className="card-subtitle mb-2 text-muted">
                                {location}
                            </h6>
                        )}
                        <p className="card-text">Made By: {owner}</p>
                    </div>
                </div>

                <div className="card border-primary mb-3">
                    <p className="columnTitle">Needed Materials</p>
                    <ul className="list-group list-group-flush">
                        {/* if the user clicks edit, then show the input field, else show the current list of requested items */}
                        {editing ? (
                            <input
                                type="text"
                                className="textbox"
                                value={newFoodList}
                                onChange={(e) => setNewFoodList(e.target.value)}
                                placeholder="Requested Items"
                            />
                        ) : (
                            <div>
                                <li className="list-group-item">
                                    {foodList.split(",")[0]}
                                </li>
                                <li className="list-group-item">
                                    {foodList.split(",")[1]}
                                </li>
                                <li className="list-group-item">
                                    {foodList.split(",")[2]}
                                </li>
                            </div>
                        )}
                    </ul>
                </div>

                <div className="card border-primary mb-3">
                    <p className="columnTitle">Quantity</p>
                    <ul className="list-group list-group-flush">
                        {/* if the user clicks edit, then show the input field, else show the current list of quanities for the items */}
                        {editing ? (
                            <input
                                type="text"
                                className="textbox"
                                value={newQuantity}
                                onChange={(e) => setNewQuantity(e.target.value)}
                                placeholder="Quantity"
                            />
                        ) : (
                            <div>
                                <li className="list-group-item">
                                    {quantity.split(",")[0]}
                                </li>
                                <li className="list-group-item">
                                    {quantity.split(",")[1]}
                                </li>
                                <li className="list-group-item">
                                    {quantity.split(",")[2]}
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            
            {/* if the user clicks edit, then replace the edit button with Done and Delete buttons */}
            {editing ? (
                <div>
                    <button
                        className="bank-button"
                        onClick={() => updateBank()}
                    >
                        Done
                    </button>
                    <button
                        className="bank-button"
                        onClick={() => deleteBank()}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                //if owned is set to false, then hide this button, meaning they do not own this food bank and cannot edit
                <button
                    className="bank-button"
                    hidden={owned ? "" : "hidden"}
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>
            )}
        </div>
    );
}

export default FoodBank;
