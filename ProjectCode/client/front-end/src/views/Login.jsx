import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
      event.preventDefault();
    
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
        if (auth.user.hasRole("USER")) {
            navigate("/profile");
        } if (auth.user.hasRole("ADMIN")){
            navigate("/admin/members");
        }
      } else if (response.status === 403) {
        setErrors(["Login failed."]);
      } else {
        setErrors(["Unknown error."]);
      }
    };

  return (

    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box" onSubmit={handleSubmit}>
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
                <br />
                <div className="field is-grouped">
                  <div className="control">
                    <button type="submit" className="button is-success">Login</button>
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