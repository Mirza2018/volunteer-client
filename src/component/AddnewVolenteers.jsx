

const AddnewVolenteers = () => {
    const handelForm = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const url = e.target.file.value;
        const item={
            name,url
        }
        console.log(name, url);
        fetch('http://localhost:5000/addnew',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(item)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
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