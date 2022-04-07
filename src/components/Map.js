import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore';
import List from '../List';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { db } from '../firebase';
import './Map.css'
import axios from "axios"


function Map() {
    const [center, setCenter] = useState({lat: 39.381266, lng: -97.922211});
    const [allCoords , setAllCoords] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [banks, setBanks] = useState([]);

    //style for google map
    const containerStyle = {
        height: '93.3vh', 
        width: '75vw'
    }

    //prompts user to allow access to their location and sets center to their location
    const getUserPosition = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            //console.log(position.coords.latitude, position.coords.longitude);
            setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        },
        function(error) {
            console.error("Error Code = " + error.code + " - " + error.message);
        });
    }

    //uses google maps geocoding api to convert address to lat/lng and stores it in allCoords
    const geocode = (address) => {
        const uri = address;
        const encoded = encodeURI(uri);
        const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encoded +'&key=AIzaSyCpeVqTNwqDGO9mRZYRd8KFlui8SaXZ4Ik'
        axios.get(endpoint).then(response => {
            const coords = response.data.results[0].geometry.location;
            setAllCoords(allCoords => [...allCoords, coords]);
        })
    }
    
    //runs on load
    useEffect(() => {
        //gets all banks from firebase
        const getBankAddresses = async () => {
            try {
                const q = query(collection(db, 'banks'));
                const snapshot = await getDocs(q);
                setBanks(snapshot.docs.map(doc => doc.data()));
                snapshot.forEach((doc) => {
                    geocode(doc.data().location);
                });
            } catch (err) {
                console.error(err);
                alert("An error occured while fetching user data");
            }
        }
    
        getUserPosition();
        getBankAddresses();
    }, [])

    return (        
        <div className='map'>
            <div className='map-contain'>
                <div className='list-container'>
                    <List className='map-list'/>
                </div>
                
                <div className='map-container'>
                    <LoadScript
                        googleMapsApiKey="AIzaSyCpeVqTNwqDGO9mRZYRd8KFlui8SaXZ4Ik"    
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={12}
                            disableDefaultUI={true}
                        >
                            {/* creates a marker for each coordinate */}
                            {allCoords?.map((coord, index) => (
                                <Marker key={index} position={coord} onClick={() => setActiveMarker(true)}>
                                    {activeMarker ?
                                    <InfoWindow
                                        position={coord}  
                                        onCloseClick={() => setActiveMarker(false)}
                                    >
                                        <div style={{ background: "white" }}>
                                            <h1>{banks[index].name}</h1>
                                        </div>
                                    </InfoWindow> : <></>}
                                </Marker>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>

            </div>
        </div>
    )
}

export default Map