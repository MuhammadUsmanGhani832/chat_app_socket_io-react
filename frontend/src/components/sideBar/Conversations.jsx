import Conversation from "./Conversation";
import useGetConversation from "../../Hooks/useGetConversation";
import getRandomEmojis from "../../utils/emojs";
import { useNotiContext } from "../../context/NotificationContext";



const Conversations = () => {

    const { state } = useNotiContext();
    const { conversations, loading } = useGetConversation();


   

    


    return (
        <div className="py-2 flex flex-col overflow-auto h-3/4">
            {conversations.map((item, idx) => (
                <div key={item._id}>
                    <Conversation
                        notify={state.senderId===item._id}
                        conversation={item}
                        emoji={getRandomEmojis()}
                        lastIndex={idx === conversations.length - 1}
                    />
                </div>
            ))}
            {loading ? <span className="loading loading-spinner"></span> : null}
        </div>
    )
}

export default Conversations