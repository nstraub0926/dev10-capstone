import { useContext, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { NavLink, Link } from "react-router-dom";
import NavLogo from "../assets/club-svg.svg";
import AuthContext from "../context/AuthContext";

function Nav() {

    const auth = useContext(AuthContext);

    const [isOpen, setOpen] = useState(false);

    return (
        <div className="d-flex align-items-center">
            <nav className="navbar is-transparent m-5">
                <div className="navbar-brand">
                    <img src={NavLogo}></img>
                    <NavLink className="navbar-item" id="landing" to='/'>
                        <p className="title is-1" style={{color: "#50896C"}}><strong><em>CLUB</em></strong></p>
                    </NavLink>
                    <div className="navbar-burger lg:hidden">
                        <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
                    </div>
                </div>
                {(isOpen && auth.user) ? (
                    <div className="grid">
                        <>
                            <NavLink className="navbar-item" to='/bookings'><strong>Bookings</strong></NavLink>
                            <NavLink className="navbar-item" to='/events'><strong>Events</strong></NavLink>
                            <NavLink className="navbar-item" to='/clubs'><strong>Clubs</strong></NavLink>
                            <NavLink className="navbar-item" to='/profile'><strong>Profile</strong></NavLink>
                            <NavLink className="navbar-item" to='/login' onClick={() => auth.logout()}><strong>Logout</strong></NavLink>
                        </>
                    </div>
                ) : (isOpen && !auth.user) ? (
                    <div className="grid">
                        {["About", "Contact", "SignUp", "Login"].map((link, index) => {
                            return (
                                <div className="is-centered" key={index}>
                                    <NavLink to={`/${link.toLowerCase()}`} className="navbar-item" onClick={() => setOpen(false)}><strong>{link}</strong></NavLink>
                                </div>
                            );
                        })}
                    </div>
                ): null}
                <div className="navbar-menu">
                    <div className="navbar-end">
                        {auth.user && auth.user.hasRole("USER") ? (
                            <>
                                <NavLink className="navbar-item" to='/bookings'><strong>BOOKINGS</strong></NavLink>
                                <NavLink className="navbar-item" to='/events'><strong>EVENTS</strong></NavLink>
                                <NavLink className="navbar-item" to='/clubs'><strong>CLUBS</strong></NavLink>
                                <NavLink className="navbar-item" to='/profile'><strong>PROFILE</strong></NavLink>
                                <NavLink className="navbar-item" to='/' onClick={() => auth.logout()}><strong>LOGOUT</strong></NavLink>
                            </>
                        ) : auth.user && auth.user.hasRole("ADMIN") ? (
                            <>
                                <NavLink className="navbar-item" to='/admin/bookings'><strong>BOOKINGS</strong></NavLink>
                                <NavLink className="navbar-item" to='/admin/events'><strong>EVENTS</strong></NavLink>
                                <NavLink className="navbar-item" to='/admin/members'><strong>MEMBERS</strong></NavLink>
                                <NavLink className="navbar-item" to='/' onClick={() => auth.logout()}><strong>LOGOUT</strong></NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="navbar-item" to='/about'><strong>ABOUT</strong></NavLink>
                                <NavLink className="navbar-item" to='/contact'><strong>CONTACT</strong></NavLink>
                                <NavLink className="navbar-item" to='/signup'><strong>SIGN UP</strong></NavLink>
                                <NavLink className="navbar-item" to='/login'><strong>LOGIN</strong></NavLink>
                            </>
                        )}
                    </div>
                    {/* {auth.user && (
                        <div>
                            Welcome back {auth.user.username}!
                        </div>
                    )} */}
                </div>
            </nav>
        </div>
    );
}

export default Nav;