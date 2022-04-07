import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Header from './components/Header';
import List from './List';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import Account from './Account';
import Map from './components/Map';

function App() {
  return (
    //creates all of the paths to each component
    <Router>
      <Header />
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/banks' element = {<List />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/register' element = {<Register />}/>
        <Route path='/reset' element = {<Reset />}/>
        <Route path='/account' element = {<Account />}/>
        <Route path='/map' element = {<Map />}/>
      </Routes>
    </Router>
  );
}

export default App;
