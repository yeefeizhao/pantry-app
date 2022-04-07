import React, { useEffect, useState } from 'react'
import FoodBank from './components/FoodBank';
import { db } from './firebase';
import { query, collection, getDocs } from "firebase/firestore";
import './List.css'
//import Footer from './Footer';

function List() {

    const [banks, setBanks] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = (search) => {
        setSearch(search);
        if (search) {
            filterPosts(search.toLowerCase());
        }
        else {
            getBanks();
        }
    }

    const filterPosts = (search) => {
            banks.forEach(bank => {
                if (bank.foodList.includes(search)) {
                    setBanks(banks.filter(bank => bank.foodList.includes(search)))
                }
            })
    }

    const getBanks = async () => {
        try {
            const q = query(collection(db, 'banks'));
            const snapshot = await getDocs(q);
            setBanks(snapshot.docs.map(doc => doc.data()))
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    }

    useEffect(() => {
        getBanks();
    }, [])
    
    return (
        <div className='list'>
            <input type='text' className='textbox' value={search} onChange={e => handleSearch(e.target.value)} placeholder='Search for Requested Items'/>
            {banks?.map((bank, index) => (
                <div key={index}>
                    <FoodBank className='bank'
                        uid={bank.uid}
                        owner={bank.owner}
                        name={bank.name}
                        location={bank.location}
                        quantity={bank.quantity}
                        foodList={bank.foodList}
                    />
                </div>
            ))}

        <div>
            {/* <Footer /> */}
        </div>
        </div>
    )

    
}

export default List