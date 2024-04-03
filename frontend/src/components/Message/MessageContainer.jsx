import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConservation from '../../zustand/useConservation'
import { useEffect } from "react";


const MessageContainer = () => {

    const { selectedConversation, setSelectedConversation } = useConservation();

    useEffect(() => {

        // cleanup funstion
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <div className="md:min-w-[450px] flex flex-col ml-2">
            {!selectedConversation
                ? <div className="w-full h-full flex  justify-center items-center">
                    <div>select the user to chat with</div>
                </div>
                : <>
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="label-text text-white">To: </span>
                        <span className="text-gray-900 font-bold">Jhon jack</span>
                    </div>
                    <Messages />
                    <MessageInput />

                </>}
        </div>
    )
}

export default MessageContainer;