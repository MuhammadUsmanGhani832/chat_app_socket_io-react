
import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConservation';
import { useAuthContext } from '../context/AuthContext';
import { useNotiContext } from '../context/NotificationContext';

const useListenMessage = () => {
    const { setState } = useNotiContext()
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log(selectedConversation)
            console.log(newMessage)
            if (newMessage.senderId === selectedConversation._id) {
                setMessages([...messages, newMessage])
                setState({});
            } else {
                setState(newMessage);
            }
        })
        return () => socket?.off('newMessage')
    }, [socket, messages, setMessages, authUser, selectedConversation, setState])
}

export default useListenMessage