import Home from './pages/home/Home'
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';

import { Routes,BrowserRouter,Route,Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {
  const {user} = useContext(AuthContext);
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route  exact path="/" element={user?<Home/>:<Login/>}/>
        <Route  path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
        <Route  path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
