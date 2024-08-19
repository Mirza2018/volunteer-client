
import VolunteerList from "./VolunteerList";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const Volunteer = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [donations, setDonations] = useState([])


    const url = `https://volunteer-server-1.onrender.com/volunteerpage/?email=${user?.email}`
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('volunteer-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {

                if (!data.error) {
                    return setDonations(data)
                }
                else {
                    navigate('/')
                }
            })
    }, [url, navigate])

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
                        <th>status</th>
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