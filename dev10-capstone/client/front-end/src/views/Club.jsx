import {useState, useEffect} from 'react';
import ClubTable from '../components/ClubTable';

function Club () {

  const [clubs, setClubs] = useState([]);

  const [searchTerm, setSearchTerm] = useState({
    searchTerm: "",
  });

  useEffect(() => {
    if (searchTerm.searchTerm === "") {
    fetch("http://localhost:8080/club")
    .then((response) => {
        if (response.status !== 200) {
          return Promise.reject("No clubs found");
        }
        return response.json();
      })
      .then(setClubs)
      .catch(console.log);
    }
  }, []);

  function handleChange(event) {
    setSearchTerm((prev) => {
      const next = { ...prev };
      next[event.target.name] = event.target.value;
      console.log(next);
      return next;
    });
  }

  return (
    <>
      <div className="px-4 py-5 my-5 d-flex flex-column text-center justify-content-center">
        <h2 className="display-5 text-body-emphasis">Club Search</h2>
        <form>
          <div className="input-group input-group-lg py-4 d-flex justify-content-center">
            <input
              id="searchTerm"
              name="searchTerm"
              type="text"
              onChange={handleChange}
              value={searchTerm.searchTerm}
              className="inputGroup-sizing-lg w-75"
            />
          </div>
          <ClubTable clubs={clubs} searchTerm={searchTerm.searchTerm} />
        </form>
      </div>
    </>
  );
}

export default Club;