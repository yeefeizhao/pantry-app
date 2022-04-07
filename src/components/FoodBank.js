import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import './FoodBank.css'
import { useNavigate } from 'react-router-dom';

function FoodBank({ uid, owner, name, location, foodList, quantity}) {
  const [editing, setEditing] = useState(false); 
  const [owned, setOwned] = useState(false);
  const [user] = useAuthState(auth);
  const [newLocation, setNewLocation] = useState(location);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [newFoodList, setNewFoodList] = useState(foodList);
  const navigate = useNavigate();

  //runs on load
  useEffect(() => {
    //sets whether the user owns the food bank
    if (!user) setOwned(false);
    else if (user.uid === uid) setOwned(true);
    
  }, [user, uid])

  //update the food bank in firebase
  const updateBank = async () => {
    //catches for if fields are not filled out
    if (newLocation.length === 0) setNewLocation(location);
    if (newQuantity.length === 0) setNewQuantity(quantity);
    if (newFoodList.length === 0) setNewFoodList(foodList);
    const docRef = doc(db, 'banks', name);
    await setDoc(docRef, {
      location: newLocation,
      foodList: newFoodList,
      quantity: newQuantity,
    }, { merge: true })
    setEditing(false);
    navigate('/');
  } 
  
  //delete the food bank from firebase
  const deleteBank = async () => {
    const docRef = doc(db, 'banks', name);
    await deleteDoc(docRef);
    navigate('/');
  }

  return (
    //if currently editing return this form
    editing ? 
      <div className="foodbank container">

        <div className="card-group">
          <div className="card border-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <input type='text' className='textbox' value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder='Address'/>
              <p className="card-text">Made By: {owner}</p>
            </div>
          </div>

          <div className="card border-primary mb-3">
            <p className="inv">Needed Materials</p>
            <ul className="list-group list-group-flush" id = "invlist">
              <input type='text' className='textbox' value={newFoodList} onChange={e => setNewFoodList(e.target.value)} placeholder='Requested Items'/>
            </ul>
          </div>

          <div className="card border-primary mb-3">
            <p className="inv">Quantity</p>
            <ul className="list-group list-group-flush" id = "foodlist">
              <input type='text' className='textbox' value={newQuantity} onChange={e => setNewQuantity(e.target.value)} placeholder='Quantity'/>
            </ul>
          </div>

        </div>
        <button className='bank-button' onClick={() => updateBank()}>Done</button>
        <button className='bank-button' onClick={() => deleteBank()}>Delete</button>
      </div>

    : 
      //if not editing return this form
      <div className="foodbank container">
        <div className="card-group">

          <div className="card border-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{location}</h6>
              <p className="card-text">Made By: {owner}</p>
            </div>
          </div>

          <div className="card border-primary mb-3">
            <p className="inv">Needed Materials</p>
            <ul className="list-group list-group-flush" id = "invlist">
              {/* shows top three requested items */}
              <li className="list-group-item">{foodList.split(',')[0]}</li>
              <li className="list-group-item">{foodList.split(',')[1]}</li>
              <li className="list-group-item">{foodList.split(',')[2]}</li>
            </ul>
          </div>

          <div className="card border-primary mb-3">
            <p className="inv">Quantity</p>
            <ul className="list-group list-group-flush" id = "foodlist">
              {/* shows quantities for top three requested items */}
              <li className="list-group-item">{quantity.split(',')[0]}</li>
              <li className="list-group-item">{quantity.split(',')[1]}</li>
              <li className="list-group-item">{quantity.split(',')[2]}</li>
            </ul>
          </div>

        </div>
        {/* hide this button if the user is not the owner */}
        <button className='bank-button' hidden={owned ? '' : 'hidden'} onClick={() => setEditing(true)}>Edit</button>
    </div>
  )
}





export default FoodBank