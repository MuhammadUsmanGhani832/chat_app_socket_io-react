import { Link } from "react-router-dom";
import { useState } from "react";
import useSignIn from "../../Hooks/useSignIn";


export const Login = () => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const { loading, signin } = useSignIn();

    const handleSignin = async (e) => {

        e.preventDefault();
        signin(inputs);
    }
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full  p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1
                    className="text-3xl font-semibold text-center text-gray-300"
                >Login <span className="text-blue-500">Chat App</span>
                </h1>

                <form>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label><input type="text" placeholder="enter username" className="w-full input input-bordered h-10 "
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label><input type="password" placeholder="enter password" className="w-full input input-bordered h-10 "
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Don't"} have account?
                    </Link>
                    <button className="btn btn-block btn-sm mt-2"
                        onClick={handleSignin}
                        disabled={loading}>{
                            loading ? <span className="loading loading-spinner"></span> : "Sign In"
                        }</button>
                </form>
            </div>

        </div>
    )
}


export default Login;