import React, { useEffect, useState } from "react";
import FoodBank from "./components/FoodBank";
import { db } from "./firebase";
import { query, collection, getDocs } from "firebase/firestore";
/*
Firebase 
Description: Open Source Code package on NPM
Author / Owner (s): Google 
Usage: Storing Data on Locations and Accounts 
Online Download Link: https://www.npmjs.com/package/firebase
*/

import "./AllBanks.css";

function AllBanks() {
    //initializes state variables
    const [banks, setBanks] = useState([]);
    const [search, setSearch] = useState("");

    //runs on each change of search input
    const handleSearch = (search) => {
        setSearch(search);
        if (search) {
            filterPosts(search.toLowerCase());
        } else {
            getBanks();
        }
    };

    //filters out banks that don't match the search
    const filterPosts = (search) => {
        banks.forEach((bank) => {
            if (bank.foodList.includes(search)) {
                setBanks(
                    banks.filter((bank) => bank.foodList.includes(search))
                );
            }
        });
    };

    //gets all banks from firebase
    const getBanks = async () => {
        try {
            const quer = query(collection(db, "banks")); 
            const snapshot = await getDocs(quer);
            setBanks(snapshot.docs.map((doc) => doc.data()));
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        getBanks();
    }, []);

    return (
        <div className="listing">
            <input
                type="text"
                className="textbox"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for Requested Items"
            />
            {/* loops through each bank and creates a bank component for it */}
            {banks?.map((bank, index) => (
                <div key={index}>
                    <FoodBank
                        className="bank"
                        uid={bank.uid}
                        owner={bank.owner}
                        name={bank.name}
                        location={bank.location}
                        quantity={bank.quantity}
                        foodList={bank.foodList}
                        account={false}
                    />
                </div>
            ))}
        </div>
    );
}

export default AllBanks;
