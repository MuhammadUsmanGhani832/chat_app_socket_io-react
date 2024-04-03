/* eslint-disable react/prop-types */
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConservation';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;

    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const chatProfilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const boubleBackground = fromMe ? 'bg-blue-500' : 'bg-gray-700';
    const userName = fromMe ? authUser.fullName : selectedConversation.fullName;


    function formatTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
    return (
        <>
            <div className={`chat ${chatClassName}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src={chatProfilePic} />
                    </div>
                </div>
                <div className="chat-header">
                    {userName}
                    <time className="text-xs opacity-50">-  {formatTime(message.createdAt)}</time>
                </div>
                <div className={`chat-bubble ${boubleBackground}`}>{message.message}</div>
                {/* <div className="chat-footer opacity-50">
                    Delivered
                </div> */}
            </div>
            {/* <div className="chat chat-end ">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-header ">
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble chat-bubble-success">I hate you!</div>
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div> */}
        </>
    )
}

export default Message 