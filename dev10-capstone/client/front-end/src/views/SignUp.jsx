import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function SignUp() {
    const [role, setRole] = useState("Club Member");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);
    
    const navigate = useNavigate();

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setErrors(["Passwords do not match."]);
            return false;
        }
        return true;
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validatePassword()) {
          return;
      }
    
      const createAccount = await fetch("http://localhost:8080/create_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      // Error mitigation for duplicate usernames, passwords that don't meet requirements, etc.

      if (createAccount.status === 201) {
        const response = await fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
        });
    
        if (response.status === 200) {
            const { jwt_token } = await response.json();
            auth.login(jwt_token);
            if (role === "Club Member") {
                navigate("/profile");
            } else {
                navigate("/admin/club");
            }
          } else if (response.status === 403) {
            setErrors(["Login failed."]);
          } else {
            setErrors(["Unknown error."]);
          }
        };
    }

  return (

    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Select Role</label>
                <div className="control">
                    <div className="select">
                    <select onChange={(event) => setRole(event.target.value)}>
                        <option>Club Member</option>
                        <option>Club Owner</option>
                    </select>
                    </div>
                </div>
              </div>
              <div className="field">
                {/* Includes for/id attributes for basic HTML accessibility ♿. */}
                <label className="label" htmlFor="username">Username</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      placeholder="e.g. someone@gmail.com"
                      onChange={(event) => setUsername(event.target.value)}
                      id="username"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="password">Password</label>
                    <div className="control has-icons-left">
                        <input
                        className="input"
                        type="password"
                        placeholder="********"
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                        />
                        <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="password">Confirm Password</label>
                    <div className="control has-icons-left">
                        <input
                        className="input"
                        type="password"
                        placeholder="********"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        id="confirmPassword"
                        />
                        <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                        </span>
                    </div>
                </div>
                <br />
                <div className="field is-grouped">
                  <div className="control">
                    <button type="submit" className="button is-success">Sign Up</button>
                  </div>
                  <div className="control">
                    <Link to='/' className="button is-link is-warning">Cancel</Link>
                  </div>
                  </div>
              </form>
              {errors.map((error) => (
                <div className="notification is-danger is-light">{error}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}