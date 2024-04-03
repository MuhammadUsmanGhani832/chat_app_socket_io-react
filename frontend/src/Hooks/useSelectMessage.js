import { useState } from 'react';
import useConservation from '../zustand/useConservation'
import toast from 'react-hot-toast';

const useSelectMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConservation();


    const sendMessage = async (message) => {
        setLoading(true)

        try {
            const res = await fetch(`/chatapp/message/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ message })
            })
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, sendMessage }
}

export default useSelectMessage