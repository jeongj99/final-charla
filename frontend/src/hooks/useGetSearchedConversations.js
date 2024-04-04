import { useEffect } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetSearchedConversations = () => {
  const { searchQuery, setSearchQuery, searchResults, setSearchResults } = useConversation();


  useEffect(() => {
    const getSearchedConversations = async () => {
      if (searchQuery) {
        try {
          const res = await fetch(`/api/users/search?q=${searchQuery}`);
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setSearchResults(data);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    getSearchedConversations();
  }, [searchQuery, setSearchResults]);

  return { searchQuery, setSearchQuery, searchResults };
};

export default useGetSearchedConversations;