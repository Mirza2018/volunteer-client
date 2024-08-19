import Swal from "sweetalert2";


const AddnewVolenteers = () => {
    const handelForm = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const url = e.target.file.value;
        const item = {
            name, img: url
        }







        Swal.fire({
            title: 'Do you want to Add new volunteer operation?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
        })


            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch('https://volunteer-server-1.onrender.com/addnew', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(item)
                    })

                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                Swal.fire('Added Successfully!', '', 'success')
                            }

                        })

                }
                else if (result.isDenied) {

                    Swal.fire('Cancel Adding', '', 'info')
                }

            })






    }
    return (
        <center>
            <h1 className="text-info font-bold text-4xl">Make a volunteer cart</h1>
            <form onSubmit={handelForm}>
                <input type="text" required placeholder="Name" name='name' className="m-5 file-input file-input-bordered file-input-info w-full max-w-xs" />
                <br />
                <input type="text" placeholder="Img url" required name='file' className="m-5 file-input file-input-bordered file-input-info w-full max-w-xs" />
                <br />
                <input type="submit" placeholder="Submit" className="m-5 file-input file-input-bordered file-input-info w-full max-w-xs" /></form>
        </center>
    );
};

export default AddnewVolenteers;