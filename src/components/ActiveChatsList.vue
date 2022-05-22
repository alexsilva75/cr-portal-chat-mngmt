<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <chat-item-vue
          :key="chat.id"
          :customer-name="chat.customer || 'Cliente'"
          :session-start="chat.created_at"
          :chat-id="chat.id"
          v-for="chat in (chats as Chat[])"
        ></chat-item-vue>
      </div>
      <div class="col-md-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useChatsStore } from "@/stores/chats";
import ChatItemVue from "./ChatItem.vue";

interface Chat {
  id: number;
  customer: string;
}

const store = useChatsStore();

const chats = computed(() => store.getActiveChats);

onMounted(async () => {
  await store.setActiveChats();
});
</script>
