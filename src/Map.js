import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
/*
Firebase 
Description: Open Source Code package on NPM
Author / Owner (s): Google 
Usage: Storing Data on Locations and Accounts 
Online Download Link: https://www.npmjs.com/package/firebase
*/

import AllBanks from "./AllBanks";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
/*
React Google Maps 
Description: Open Source Code package on NPM
Author / Owner (s): Alexey Lyakhov, Uri Klar 
Usage: Used for implementing map on the maps page 
Online Download Link: https://www.npmjs.com/package/@react-google-maps/api
Other Information: Free to use under MIT License https://opensource.org/licenses/MIT
*/
import { db } from "./firebase";
import "./Map.css";

import axios from "axios";
/*
Axios
Description: Open Source Code package on NPM
Author / Owner (s): https://www.npmjs.com/~emilyemorehouse | https://www.npmjs.com/~jasonsaayman | https://www.npmjs.com/~mzabriskie | https://www.npmjs.com/~nickuraltsev 
Usage: Used to access the Google Maps API 
Online Download Link: https://www.npmjs.com/package/axios
Other Information: Free to use under MIT License https://opensource.org/licenses/MIT
*/

function Map() {
    //sets map center to center of US and makes arrays for foodbank coords
    const [center, setCenter] = useState({ lat: 39.381266, lng: -97.922211 });
    const [allBankCoords, setAllBankCoords] = useState([]);

    //sets the height and width of the map - this is a required paramter
    const mapContainerStyle = {
        height: "93.3vh",
        width: "75vw",
    };

    //prompts user to allow access to their location and sets center to their location
    const getUserPosition = () => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                //console.log(position.coords.latitude, position.coords.longitude);
                //this will update the center state to the user's location
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            function (error) {
                console.error(
                    "Error Code = " + error.code + " - " + error.message
                );
            }
        );
    };

    //uses google maps geocoding api to convert address to lat/lng and stores it in allCoords
    const geocode = (address) => {
        const uri = address;
        const encoded = encodeURI(uri);
        const endpoint =
            "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            encoded +
            "&key=" +
            process.env.REACT_APP_API_KEY;
        axios.get(endpoint).then((response) => {
            const coords = response.data.results[0].geometry.location;
            //appends on new coordinate to the allCoords array
            setAllBankCoords((allCoords) => [...allCoords, coords]);
        });
    };

    //runs once on the first render of the page
    useEffect(() => {
        //gets all banks from firebase and then geocodes their address to get their lat/lng
        const getBankAddresses = async () => {
            try {
                const quer = query(collection(db, "banks"));
                const snapshot = await getDocs(quer);
                //setBanks(snapshot.docs.map(doc => doc.data()));
                snapshot.forEach((doc) => {
                    geocode(doc.data().location);
                });
            } catch (err) {
                console.error(err);
                alert("An error occured while fetching user data");
            }
        };
        getUserPosition();
        getBankAddresses();
    }, []);

    return (
        <div className="map">
            <div className="map-contain">
                <div className="list-container">
                    <AllBanks className="map-list" />
                </div>
                <div className="map-container">
                    {/*Container for google map render*/}
                    <LoadScript
                        googleMapsApiKey={process.env.REACT_APP_API_KEY}
                    >
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={12}
                            disableDefaultUI={true}
                        >
                            {/* creates a marker for each coordinate */}
                            {allBankCoords?.map((coord, index) => (
                                <Marker key={index} position={coord}></Marker>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    );
}

export default Map;
