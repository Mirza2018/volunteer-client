
const Donation = ({ volunteer }) => {
    const { _id, name, img } = volunteer;

    return (
        <div className="relative w-96 bg-base-100 shadow-xl ">
            <figure><img src={img} alt={name} /></figure>
            <button className="btn btn-primary w-full absolute bottom-0">{name}</button>
        </div>

    );
};

export default Donation;