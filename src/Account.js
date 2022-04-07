import React, { useEffect, useState } from 'react'
import FoodBank from './components/FoodBank'
import NewPantry from './components/NewPantry'
import UpdateAccount from './components/UpdateAccount'
import { auth, db } from './firebase'
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'
import './Account.css'
//import Footer from './Footer'


function Account() {
    const [banks, setBanks] = useState([]);
    const [user, loading] = useAuthState(auth);
    
    useEffect(() => {
        const getUserBanks = async () => {
            try {
                const q = query(collection(db, 'banks'), where("uid", "==", user?.uid));
                const snapshot = await getDocs(q);
                setBanks(snapshot.docs.map(doc => doc.data()))
            } catch (err) {
                console.error(err);
                alert("An error occured while fetching user data");
            }
        }
        
        if (loading) return;
        getUserBanks();
    }, [user, loading])

    return (
        <div className='account'>
                
            <div>
                <h2 className='title'>Account</h2>

                <div>
                    <UpdateAccount />
                </div>

                <div>
                    <h3 className='sub-title'>Your Locations</h3>
                    {banks?.map((bank, index) => (
                        <FoodBank className='bank'
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

                <br>
                </br>

                <div>
                    <NewPantry />
                </div>

                
            </div>
            
        
        </div>
    )
}

export default Account