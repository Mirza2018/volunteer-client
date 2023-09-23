
const AdminPenalList = ({ donate }) => {
    const { name, img, person, email, date, donation } = donate;

    return (
        <tr>

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
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default AdminPenalList;