import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

function AdminClub() {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [club, setClub] = useState({
        appUserId: `${auth.user.appUserId}`,
        name: "",
        category: "",
        location: "",
        membershipFee: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClub({
            ...club,
            [name]: value
        });
    }   

    const items = [ {label: 'Basic Information'}, {label: 'Membership Information'}, {label: 'Describe Your Club'} ];

    const [activeIndex, setActiveIndex] = useState(0);

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/club", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(club),
        });

        if (response.status === 201) {
            setErrors([]);
            setClub({
                appUserId: `${auth.user.appUserId}`,
                name: "",
                category: "",
                location: "",
                membershipFee: "",
                description: "",
            });
            setActiveIndex(0);
            alert("Club created successfully!");
            navigate("/admin/members");
        } else {
            const data = await response.json();
            setErrors(data.errors);
        }
    }

    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                    <h1 className="title is-3" style={{"color": "white"}}>Welcome to Club!</h1>
                    <h2 className="subtitle is-6" style={{"color": "white"}}><em>Please fill in the form to create a new club.</em></h2>
                    <form action="" className="box" onSubmit={handleSubmit}>
                        <Stepper className="p-stepper-vertical steps" model={items} activeIndex={activeIndex} onIndexChange={(e) => setActiveIndex(e.index)} orientation="vertical" style={{ flexBasis: '50rem' }}>
                            <StepperPanel className="step-item" header="Basic Information">
                                <div className="p-fluid">
                                    <div className="p-field p-stepper-content mb-2">
                                        <label htmlFor="name">Club Name</label>
                                        <input id="name" type="text" name="name" value={club.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="p-field p-stepper-content mb-2">
                                        <label className="mr-2" htmlFor="category">Category</label>
                                        <select id="category" name="category" value={club.category} onChange={handleInputChange} required >
                                            <option value="">Select a Category</option>
                                            <option value="Fitness">Fitness</option>
                                            <option value="Hobby">Hobby</option>
                                            <option value="Social">Social</option>
                                            <option value="Service">Service</option>
                                        </select>
                                    </div>
                                    <div className="p-field p-stepper-content mb-2">
                                        <label htmlFor="location">Location</label>
                                        <input id="location" type="text" name="location" value={club.location} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </StepperPanel>
                            <StepperPanel className="step-item" header="Membership Information">
                                <div className="p-fluid">
                                    <div className="p-field p-stepper-content">
                                        <label htmlFor="membershipFee">Membership Fee</label>
                                        <input placeholder="$" id="membershipFee" type="number" name="membershipFee" value={club.membershipFee} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </StepperPanel>
                            <StepperPanel className="step-item" header="Description">
                                <div className="p-fluid">
                                    <div className="p-field mb-2">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="textarea" name="description" value={club.description} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="p-field p-stepper-content">
                                    <button type="submit" className="button is-primary">Create Club</button>
                                </div>
                            </StepperPanel>
                        </Stepper>
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

export default AdminClub;