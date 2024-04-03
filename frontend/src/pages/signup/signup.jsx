import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../../Hooks/useSignUp";


const Signup = () => {
    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const { signup, loading } = useSignUp();
    // loadding,
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }
    const handleCheckbox = (gender) => {
        setInputs({ ...inputs, gender })
    }
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full  p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1
                    className="text-3xl font-semibold text-center text-gray-300"
                >Sign up <span className="text-blue-500">Chat App</span>
                </h1>

                <form onSubmit={handleSubmit} >
                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text ">Full Name</span>

                        </label><input type="text" placeholder="enter name" className="w-full input input-bordered h-10 "
                            value={inputs.fullname}
                            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-white text-base label-text">Username</span>

                        </label><input type="text" placeholder="enter username" className="w-full input input-bordered h-10 "
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className=" text-white text-base label-text">Password</span>

                        </label><input type="password" placeholder="enter password" className="w-full input input-bordered h-10 "
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className=" text-white text-base label-text">Confirm Password</span>

                        </label><input type="password" placeholder="enter password" className="w-full input input-bordered h-10 "
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>
                    <div className="flex">
                        <div className="form-control">
                            <label className="label gap-2 cursor-pointer">
                                <span className="label-text text-white">Male</span>
                                <input type='checkbox' className="checkbox border-white"
                                    onChange={() => handleCheckbox('male')}
                                    checked={inputs.gender === "male"}
                                ></input>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label gap-2 cursor-pointer">
                                <span className="label-text text-white">Female</span>
                                <input type='checkbox' className="checkbox border-white"
                                    onChange={() => handleCheckbox('female')}
                                    checked={inputs.gender === "female"}></input>
                            </label>
                        </div>

                    </div>
                    <Link to="/login" className="text-sm hover:underline hover:text-blue-600  inline-block text-white">
                        {"Don't"} have account?
                    </Link>
                    <button className="btn btn-block btn-sm mt-2"
                        disabled={loading}
                    >{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}</button>
                </form>
            </div>

        </div>
    )
}


export default Signup;