import {BrowserRouter as Router ,Route , Switch}  from 'react-router-dom'
import Homepage from './Components/Homepage';
import Navigation from './Components/Navigation';
import CreateUser from './Components/CreateUser';
import EditUser from './Components/EditUser';
import Login from './Components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css';
import { AppStateContextProvider } from './AppContext/AppContext';
import axios from 'axios'



// axios.defaults.withCredentials = true;

function App() {
  return (

    <div className="App">

 
<AppStateContextProvider>

<Router>

<Navigation/> 

    <Route exact path="/" component={Homepage} />
    <Route exact path="/create/user" component={CreateUser} />
    <Route exact path="/edit/:param" component={EditUser} />
    <Route exact path="/user/login"  component={Login} />

</Router>

</AppStateContextProvider>


    </div>
  );
}

export default App;
