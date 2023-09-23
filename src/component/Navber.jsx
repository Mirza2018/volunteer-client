import { Link } from "react-router-dom";
import logo from "../assets/logos/Group 1329.png"
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const Navber = () => {
    const { user, logOut } = useContext(AuthContext);

    const liTag = <>

        <li><Link to='/'>Home</Link></li>
        <li><Link to='/volunteerpage'>My Donation</Link></li>
        <li><Link to='/'>Event</Link></li>
        <li><Link to='/'>Blog</Link></li>


    </>
    return (<>
        <div className="h-[40vh] relative " style={{ backgroundImage: `url("https://www.embracingtheworld.org/wp-content/assets/images/food_hero_1800.jpg")`, opacity: 0.2 }}>

        </div >
        <div className="navbar bg absolute top-0 font-bold ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {liTag}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl"><img className="h-[100%]" src={logo} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {liTag}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {


                    user ? <> <button className="btn bg-black text-white  w-[15vw]">{user.email}</button>
                        <button className="btn bg-black text-white  w-[15vw]" onClick={logOut} >Sign Out</button></>
                        :
                        <>
                            <Link to='/login'><button className="btn bg-black text-white  w-[15vw]">Login</button></Link>
                            <Link to='/register'><button className="btn bg-black text-white w-[15vw]">Register</button></Link>
                        </>


                }



            </div>
        </div>
    </>
    );
};

export default Navber;