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
                            <NavLink className="navbar-item" to='/bookings'><strong><em>Bookings</em></strong></NavLink>
                            <NavLink className="navbar-item" to='/events'><strong><em>Events</em></strong></NavLink>
                            <NavLink className="navbar-item" to='/clubs'><strong><em>Clubs</em></strong></NavLink>
                            <NavLink className="navbar-item" to='/profile'><strong><em>Profile</em></strong></NavLink>
                            <NavLink className="navbar-item" to='/login' onClick={() => auth.logout()}><strong><em>Logout</em></strong></NavLink>
                        </>
                    </div>
                ) : (isOpen && !auth.user) ? (
                    <div className="grid">
                        {["About", "Contact", "SignUp", "Login"].map((link, index) => {
                            return (
                                <div className="is-centered" key={index}>
                                    <NavLink to={`/${link.toLowerCase()}`} className="navbar-item" onClick={() => setOpen(false)}><strong><em>{link}</em></strong></NavLink>
                                </div>
                            );
                        })}
                    </div>
                ): null}
                <div className="navbar-menu">
                    <div className="navbar-end">
                        {auth.user && auth.user.hasRole("USER") ? (
                            <>
                                <NavLink className="navbar-item" to='/bookings'><strong><em>Bookings</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/events'><strong><em>Events</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/clubs'><strong><em>Clubs</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/profile'><strong><em>Profile</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/' onClick={() => auth.logout()}><strong><em>Logout</em></strong></NavLink>
                            </>
                        ) : auth.user && auth.user.hasRole("ADMIN") ? (
                            <>
                                <NavLink className="navbar-item" to='/admin/bookings'><strong><em>Bookings</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/admin/events'><strong><em>Events</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/admin/members'><strong><em>Members</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/' onClick={() => auth.logout()}><strong><em>Logout</em></strong></NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="navbar-item" to='/about'><strong><em>About</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/contact'><strong><em>Contact</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/signup'><strong><em>Sign Up</em></strong></NavLink>
                                <NavLink className="navbar-item" to='/login'><strong><em>Login</em></strong></NavLink>
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