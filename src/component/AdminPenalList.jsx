import Swal from "sweetalert2";

const AdminPenalList = ({ donate, handlePatch,handleDelete }) => {
    const { _id, name, img, person, email, date, donation,status } = donate;



    return (
        <tr>
<td>
    <button onClick={()=>handleDelete(_id)} className="bg-red-600 text-white font-bold rounded-full p-2">X</button>
</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td>
                {person}
                <br />
                <span className="badge badge-ghost badge-sm">{email}</span>
            </td>
            <td>{"$ " + donation}
                <br />
                <span className="badge badge-ghost badge-sm">{date}</span>
            </td>

            <th>
                {
                    status? 
                    <button className="btn btn-ghost btn-xs bg-success">confirm</button>
                    :
                    <button onClick={() => handlePatch(_id)} className="btn btn-ghost btn-xs bg-warning">waiting</button>
                }
                
                
            </th>
        </tr>
    );
};

export default AdminPenalList;