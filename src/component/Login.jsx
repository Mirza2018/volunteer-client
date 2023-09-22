import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from 'sweetalert2'
import { FcGoogle } from "react-icons/fc";


const Login = () => {

    const { logIn, googleLogIn } = useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        logIn(email, password)
            .then(res => {
                console.log(res.user);
                Swal.fire(
                    'Successfully login!',
                    'your welcome',
                    'success'
                )
                e.target.reset()
            })
            .catch(error => {
                console.log(error);
            })
    }
    const googlePopUp = () => {
        googleLogIn()
            .then(res => {
                console.log(res.user);
                Swal.fire(
                    'Successfully login!',
                    'your welcome',
                    'success'
                )
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' required placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' required placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover"><Link to='/register'>Don't have an account? Register</Link></a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
<div onClick={googlePopUp} className="form-control mt-6">
                        <button className="btn btn-primary"><FcGoogle/> Google log IN</button>
                    </div>

                        </div>
                    </div>
                    

                </form>

            </div>
        </div>
    );
};

export default Login;