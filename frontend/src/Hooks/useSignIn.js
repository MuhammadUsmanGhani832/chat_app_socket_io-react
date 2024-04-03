import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext'


const useSignIn = () => {

    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const signin = async ({ username, password }) => {
        const success = handleInputError({ username, password });
        if (!success) return;
        setLoading(true)
        try {
            const res = await fetch('chatapp/auth/signin', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success('Successfully login!')
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signin }
}

export default useSignIn;




const handleInputError = ({ username, password }) => {
    if (!username || !password) {
        toast.error("please fill in all fields");
        return false;
    }
    return true;
} 