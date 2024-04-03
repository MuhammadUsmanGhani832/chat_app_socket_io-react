/* eslint-disable react/prop-types */

import { useNotiContext } from "../../context/NotificationContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConservation";
import './styles.css'

const Conversation = ({ conversation, emoji, lastIndex, notify }) => {

    const { setState } = useNotiContext();
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUser } = useSocketContext();

    const isOnline = onlineUser.includes(conversation._id)
    const isSelected = selectedConversation?._id === conversation._id
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursore-pointer
            ${isSelected ? "bg-sky-500" : ''}`}
                onClick={() => {
                    setSelectedConversation(conversation)
                    setState({})
                }}>
                <div className={`avatar ${isOnline ? "online" : ''}`}>
                    <div className=" w-12 rounded-full">
                        <img src={conversation.profilePic} alt="user avatar"></img>
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex gap-3  justify-between">
                        <p className="font-bold text-gray-200">{conversation.fullName}</p>
                        {notify ? <span className="usman"></span> : null}
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>
            {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
        </>
    )
}

export default Conversation