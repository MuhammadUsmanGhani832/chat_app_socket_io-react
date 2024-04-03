import toast from 'react-hot-toast';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useContext(AuthContext);

    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputError({ fullname, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch('chatapp/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName: fullname, username, password, confirmPassword, gender })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success('Successfully login!')
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally {

            setLoading(false)
        }
    }

    return { signup, loading }
}

export default useSignUp;

const handleInputError = ({ fullname, username, password, confirmPassword, gender }) => {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("please fill in all fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("password not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("password must be ateast 6 characters");
        return false;
    }

    return true;
}