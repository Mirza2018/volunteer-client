import {  useNavigate } from "react-router-dom";
import AdminPenalList from "./AdminPenalList";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const AdimPenal = () => {
    const [donations, setDonations] = useState([])

    const navigate = useNavigate()
    const url = 'http://localhost:5000/adminpage'


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
                // else {
                //     navigate('/')
                // }
            })
    }, [url, navigate])

    console.log(donations);

    const handlePatch = (id) => {
        fetch(`http://localhost:5000/update/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status: "confirm" })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        'Update Successfully Done!',
                        'confirm',
                        'success'
                    )
                    const remaining = donations.filter(r => r._id !== id);
                    const update = donations.find(r => r._id === id);
                    update.status = "confirm"
                    const latestData = [update, ...remaining]
                    setDonations(latestData)
                }
            })
    }

    const handleDelet = (id) => {

        Swal.fire({
            title: 'Do you want to Delete It?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
        })

            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/delete/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.deletedCount) {
                                Swal.fire('Succressfully removed', '', 'success')

                                const remaining = donations.filter(r => r._id !== id);
                                const latestData = [...remaining]
                                setDonations(latestData)

                            }
                        })
                }
                else if (result.isDenied) {

                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
    }


    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Donation Amount</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        donations.map(donate => <AdminPenalList
                            key={donate._id}
                            donate={donate}
                            handlePatch={handlePatch}
                            handleDelete={handleDelet}
                        ></AdminPenalList>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default AdimPenal;