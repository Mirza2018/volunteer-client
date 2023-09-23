import { useLoaderData } from "react-router-dom";
import VolunteerList from "./VolunteerList";


const Volunteer = () => {
    const donations = useLoaderData()
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