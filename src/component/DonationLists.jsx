import { useEffect, useState } from "react";
import Donation from "./Donation";
import { useLoaderData } from "react-router-dom";

const DonationLists = () => {

    const [volunteers, setVolunteers] = useState([])

    const { totalProducts } = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6)


    const totalPage = Math.ceil(totalProducts / itemsPerPage)
    console.log(totalPage);
    const pageNumbers = [...Array(totalPage).keys()]
    console.log(pageNumbers);
    const options = [6, 9];
    const handleSelectChange = (e) => {
        setItemsPerPage(parseInt(e.target.value))
        setCurrentPage(0)
    }





    useEffect(() => {
        fetch(`http://localhost:5000/volunteer?page=${currentPage}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setVolunteers(data))
    }, [currentPage, itemsPerPage])


    return (
        <>
            <div className="grid md:grid-cols-2  grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 mt-20 p-6 gap-10 place-items-center  ">
                {
                    volunteers.map(volunteer =>
                        <Donation key={volunteer._id}
                            volunteer={volunteer}
                        ></Donation>
                    )
                }
            </div>
            <center className="text-2xl">

                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ?
                            'bg-yellow-400 font-bold rounded p-2 m-3' : 'm-3'}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }


                <select className="border-4 border-black" value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }

                </select>
            </center>
        </>
    );
};

export default DonationLists;