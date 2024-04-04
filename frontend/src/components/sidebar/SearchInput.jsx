import useGetSearchedConversations from "../../hooks/useGetSearchedConversations";


const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useGetSearchedConversations();

  return (
    <form className="flex items-center gap-2">
      <input type="text" placeholder="Search username..." className="input input-bordered rounded-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
    </form>
  );
};

export default SearchInput;