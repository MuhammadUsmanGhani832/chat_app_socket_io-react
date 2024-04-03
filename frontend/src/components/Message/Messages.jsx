import useGetMessages from "../../Hooks/useGetMessages"
import useListenMessage from "../../Hooks/useListenMessage";
import Message from "./Message";
import { useEffect, useRef } from "react";


const Messages = () => {
    const { messages, loading } = useGetMessages();
    const lastMessage = useRef();
    useListenMessage();
    useEffect(() => {
        setTimeout(() => {
            lastMessage.current?.scrollIntoView({ behavior: "smooth" })
        }, 100);
    }, [messages])

    return (
        <div className="px-4 flex-1 overflow-auto w-[600px]">
            {!loading && messages.length > 0 && (
                messages.map((message) => (
                    <div key={message._id} ref={lastMessage}>
                        <Message
                            message={message} />
                    </div>
                ))
            )}

            {loading && (
                <div className="flex flex-col gap-4 w-52">
                    <div className="flex gap-4 items-center">
                        <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
            )}
            {!loading && messages.length === 0 && (
                <p className="text-center">Send message to start conversation</p>
            )}
        </div>
    )
}

export default Messages