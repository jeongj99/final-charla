import SearchInput from "./SearchInput";
import SearchedUsers from "./SearchedUsers";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useConversation from "../../store/useConversation";

const Sidebar = () => {
  const { searchQuery } = useConversation();

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3" />
      {searchQuery ? <SearchedUsers /> : <Conversations />}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;