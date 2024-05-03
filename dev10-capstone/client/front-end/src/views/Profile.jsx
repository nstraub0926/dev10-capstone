import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const DEFAULT_MEMBER = {
    memberId: 0,
    name: "",
    phone: "",
    address: "",
    membershipStatus: "",
    membershipType: "",
    joinDate: "",
    expirationDate: "",
};

function Profile() {

    const [member, setMember] = useState(DEFAULT_MEMBER);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { memberId } = useParams();

    useEffect(() => {
    if(memberId) {
        fetch(`http://localhost:8080/members/${memberId}`)
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject("No member found");
            }
            return response.json();
            })
            .then((data) => setMember(data))
            .catch(console.log);
        }
    }, [memberId]);

    return (
        <div className="box has-text-centered has-background-white">
            <div>
                <div className="flex-shrink-0">
                    {/* <a href="#" class="image is-64x64 m-auto">
                        <img alt="profile" src="/images/person/1.jpg" class="is-rounded"/>
                    </a> */}
                </div>
                <div className="mb-4">
                    <p className="has-text-grey-dark">
                        Charlie
                    </p>
                    <p className="has-text-grey-dark-light is-size-7">
                        CTO
                    </p>
                </div>
                <button className="button is-primary ">
                    Add
                </button>
            </div>
        </div>
    );
}

export default Profile;