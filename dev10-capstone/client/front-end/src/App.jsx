import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import AdminClub from './views/AdminClub'
import AdminEvent from './views/AdminEvent';
import AdminMember from './views/AdminMember'
import AuthContext from './context/AuthContext';
import Booking from './views/Booking'
import Club from './views/Club'
import Event from './views/Event'
import Login from './views/Login'
import Nav from './components/Nav'
import Profile from './views/Profile'
import SignUp from './views/SignUp'

const LOCAL_STORAGE_TOKEN_KEY = "club-auth";

function App() {

  const [user, setUser] = useState(null);
  const [restoreLogin, setRestoreLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLogin(true);
  }, []);

  const login = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    
    const { app_user_id: appUserId, sub: username, authorities: authorities } = jwtDecode(token);

    const roles = authorities.split(',');

    const user = {
      appUserId,
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };

    setUser(user);

    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? {...user} : null,
    login,
    logout
  };

  if (!restoreLogin) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <header className="d-flex justify-content-center">
          <Nav/>
        </header>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/clubs" element={<Club />} />
          <Route path="/events" element={<Event />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/admin/clubs" element={<AdminClub />} />
          <Route path="/admin/members" element={<AdminMember />} />
          <Route path="/admin/events" element={<AdminEvent />} />
          <Route path="/admin/bookings" element={<h1>Bookings</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
