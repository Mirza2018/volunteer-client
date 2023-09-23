
import VolunteerList from "./VolunteerList";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const Volunteer = () => {
    const { user } = useContext(AuthContext)
    const [donations, setDonations] = useState([])
const url=`http://localhost:5000/volunteerpage/?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setDonations(data))
    }, [url])

    console.log(donations);
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Donation Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        donations.map(donate => <VolunteerList
                            key={donate._id}
                            donate={donate}
                        ></VolunteerList>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default Volunteer;