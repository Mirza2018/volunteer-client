import { useEffect, useState } from "react";
import Donation from "./Donation";

const DonationLists = () => {
    const [volunteers, setVolunteers] = useState([])
    const url = 'http://localhost:5000/volunteer'
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setVolunteers(data))
    }, [url])

    console.log(volunteers);
    return (
        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-20 gap-10">
            {
                volunteers.map(volunteer =>
                    <Donation key={volunteer._id}
                        volunteer={volunteer}
                    ></Donation>
                )
            }
        </div>
    );
};

export default DonationLists;