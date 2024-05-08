import {useState, useEffect} from 'react';
import ClubTable from '../components/ClubTable';

function Club () {

  const [clubs, setClubs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/club`)
    .then((response) => {
        if (response.status !== 200) {
          return Promise.reject("No clubs found");
        }
        return response.json();
      })
      .then(setClubs)
      .catch(console.log);
  }, []);

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <section className="hero is-primary is-fullheight section" id="club">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column">
              <div className="box">
                <div className="field is-grouped">
                  <p className="control is-expanded">
                      <input className="input" type="text" onChange={handleChange} placeholder="Search for a club..."/>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column">
              <div className="card">
                <div className="card-content"> 
                  <div className="content">
                    <ClubTable clubs={clubs.filter((club) => club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                                             club.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                             club.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                             club.description.toLowerCase().includes(searchTerm.toLowerCase()))}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Club;