import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";


const DonationSingle = () => {

    const { user } = useContext(AuthContext)
    const data = useLoaderData()
    const { name, img } = data;
    const handleSubmit = (e) => {
        e.preventDefault()
        const person = e.target.person.value;
        const email = e.target.email.value;
        const date = e.target.date.value;
        const donation = e.target.donation.value;
        const details = {
            name, img, person, email, date, donation
        }


        Swal.fire({
            title: 'Do you want to Donate somthing?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
        })
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {


                    fetch(`http://localhost:5000/donation`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(details)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                Swal.fire('Thanks for donate us!', '', 'success')
                            }

                        })

                } 
                else if (result.isDenied) {

                    Swal.fire('Changes are not saved', '', 'info')
                }
                
            })








    }
    return (
        <center>
            <form onSubmit={handleSubmit}>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">


                        <div>
                            <div className="hero-content ">
                                <img src={img} className=" " />
                            </div>
                            <h1>{name}</h1>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='person' required value={user?.displayName} className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' required value={user?.email} className="input input-bordered" />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name='date' required className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Donation</span>
                            </label>
                            <input type="number" name='donation' required placeholder="Donation Amount" className="input input-bordered" />
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Donate now</button>
                        </div>


                    </div>
                </div>


            </form>
        </center>
    );
};

export default DonationSingle;