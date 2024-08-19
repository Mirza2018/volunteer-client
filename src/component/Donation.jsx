import { Link } from "react-router-dom";

const Donation = ({ volunteer }) => {
    const { _id, name, img } = volunteer;

    return (
        <div className="relative w-96 bg-base-100 shadow-xl ">
            <figure><img src={img} alt={name} /></figure>
            <Link  to={`/donation/${_id}`}>
            <button className="btn btn-info w-full absolute bottom-0 text-white ">{name}</button></Link>
        </div >

    );
};

export default Donation;