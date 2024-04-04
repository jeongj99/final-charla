import { create } from "zustand";

const useConversation = create(set => ({
  selectedConversation: null,
  setSelectedConversation: selectedConversation => set({ selectedConversation }),
  messages: [],
  setMessages: messages => set({ messages }),
  conversations: [],
  setConversations: conversations => set({ conversations }),
  searchQuery: "",
  setSearchQuery: searchQuery => set({ searchQuery }),
  searchResults: null,
  setSearchResults: searchResults => set({ searchResults }),
  messageLoading: false,
  setMessageLoading: messageLoading => set({ messageLoading }),
  sendLoading: false,
  setSendLoading: sendLoading => set({ sendLoading }),
  conversationLoading: false,
  setConversationLoading: conversationLoading => set({ conversationLoading })
}));

export default useConversation;