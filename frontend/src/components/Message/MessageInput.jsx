import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSelectMessage from "../../Hooks/useSelectMessage";

const MessageInput = () => {
    const { loading, sendMessage } = useSelectMessage();

    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return
        sendMessage(message);
        setMessage('')
    }
    return (
        <form className="px-4 my-3">
            <div className="w-full relative">
                <input type="text" className="border text-sm rounded-lg block w-full bg-gray-600 text-white" placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}></input>
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3"
                    onClick={handleSubmit}>
                    {loading ? <span className="loading loading-spinner"></span> : <BsSend />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput