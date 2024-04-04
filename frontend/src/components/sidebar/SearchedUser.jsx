import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";

const SearchedUser = ({ searchResult, lastIdx }) => {
  const { setSelectedConversation, setSearchQuery } = useConversation();


  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(searchResult._id);

  return (
    <>
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
        onClick={() => {
          setSelectedConversation(searchResult);
          setSearchQuery("");
        }}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={searchResult.profilePic}
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-1 justify-between">
            <p className="font-bold text-gray-200">{searchResult.fullName}</p>
          </div>
        </div>
      </div >
      {!lastIdx && <div className="divider my-0 py-0 h-1" />
      }
    </>
  );
};

export default SearchedUser;