import SearchedUser from "./SearchedUser";
import useGetSearchedConversations from "../../hooks/useGetSearchedConversations";

const SearchedUsers = () => {
  const { searchResults } = useGetSearchedConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {searchResults?.map((searchResult, idx) => (
        <SearchedUser
          key={searchResult._id}
          searchResult={searchResult}
          lastIdx={idx === searchResult.length - 1}
        />
      ))}
    </div>
  );
};

export default SearchedUsers;