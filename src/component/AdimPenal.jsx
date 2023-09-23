import { useLoaderData } from "react-router-dom";
import AdminPenalList from "./AdminPenalList";


const AdimPenal = () => {
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
                        donations.map(donate => <AdminPenalList
                            key={donate._id}
                            donate={donate}
                        ></AdminPenalList>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default AdimPenal;