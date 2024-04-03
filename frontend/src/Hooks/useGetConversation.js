import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNotiContext } from "../context/NotificationContext";


const useGetConversation = () => {
   const [loading, setLoading] = useState(false);
   const [conversations, setConversations] = useState([]);
   const { state } = useNotiContext();

   useEffect(() => {
      const getConversation = async () => {
         setLoading(true)
         try {
            const res = await fetch('chatapp/users');
            const data = await res.json();
            if (data.error) {
               throw new Error(data.error)
            }
            console.log(data)
            setConversations(data)
         } catch (error) {
            toast.error(error.message)
         } finally {
            setLoading(false)
         }
      }
      getConversation();
   }, [state])


   return { conversations, loading }
}

export default useGetConversation