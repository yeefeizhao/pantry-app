import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../firebase';
import { query, collection, getDocs, where } from "firebase/firestore";
import './UpdateAccount.css'
import validator from 'validator'
import { useNavigate } from 'react-router-dom';

 

function UpdateAccount() {
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [user, loading] = useAuthState(auth);
    const [currentName, setCurrentName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const navigate = useNavigate();

    //checks whether the email is valid
    const handleEmail = (email) => {
        setNewEmail(email);

        if (validator.isEmail(email)) {
            setValidEmail(true);
        } else {
            setValidEmail(false)
        }
    }
    

    useEffect(() => {
        //sets current users name and email from firebase
        const fetchUserName = async () => {
            try {
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                setCurrentName(data.user);
                setCurrentEmail(data.email);
            } catch (err) {
                console.error(err);
            }
        }

        if (loading) return;
        if(!user) navigate('/');
        fetchUserName();
    }, [user, loading, navigate]);

    return (
        <div className='update-account'>
            <h3>Update Account Information</h3>

            <div className='form'>
                <input type='text' className='textbox' value={newName} onChange={e => setNewName(e.target.value)} placeholder={currentName}/>
                {/* show button only if there is a names entered */}
                <button className='button' hidden={newName ? '' : 'hidden'} >Change Name</button>
            </div>
            
            <div className='form'>
                <input type='text' className='textbox' value={newEmail} onChange={e => handleEmail(e.target.value)} placeholder={currentEmail}/>
                {/* show button only if there is a valid email entered */}
                <button className='button' hidden={(newEmail && validEmail) ? '' : 'hidden'} >Change Email</button>
            </div>
            <button className='button' onClick={logout}>Log Out</button>
        </div>
    )
}

export default UpdateAccount