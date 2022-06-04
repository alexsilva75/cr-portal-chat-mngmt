import { useAuthStore } from "@/stores/auth";
import { defineStore } from "pinia";
import axios from "axios";

const axiosInstance = axios.create({ withCredentials: true });

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
      const authStore = useAuthStore();
      const response = await axiosInstance.get(
        `${options.baseURL}/api/v1/customers-chats`,
        {
          headers: {
            Authorization: `Bearer ${authStore.authToken}`,
          },
        }
      );

      this.activeChats = response.data.connections;
      console.log("Active chats", response);
    },

    async fetchChatMessages(chatId: number) {
      const authStore = useAuthStore();
      const response = await axiosInstance.get(
        `${options.baseURL}/api/v1/chat/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${authStore.authToken}`,
          },
        }
      );

      this.selectedChat = response.data.chat;
    },
  },
});
