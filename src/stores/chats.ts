import { defineStore } from "pinia";
import axios from "axios";

import options from "../globalOptions";

export const useChatsStore = defineStore({
  id: "chats",
  state: () => ({
    activeChats: [],
    selectedChat: null,
  }),
  getters: {
    getActiveChats: (state) => state.activeChats,
  },

  actions: {
    async setActiveChats() {
      const response = await axios.get(
        `${options.baseURL}/api/v1/customers-chats`
      );

      this.activeChats = response.data.connections;
      console.log("Active chats", response);
    },
  },
});
