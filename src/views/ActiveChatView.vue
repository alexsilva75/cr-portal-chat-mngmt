<template>
  <div class="container">
    <h1>Atendimento nº: {{ chatId }}</h1>
    <div
      class="min-vh-75 chat-container d-flex flex-column justify-content-around"
    >
      <div
        v-if="selectedChat"
        class="chat-panel d-flex flex-column justify-content-end"
      >
        <chat-message-vue
          class="mb-2"
          :key="message.id"
          v-for="message in (selectedChat as any).messages"
          :message="message.message"
          :sender="message.sender_type"
        ></chat-message-vue>
      </div>

      <div class="chat-form-holder p-3 mb-2">
        <form @submit.prevent="sendMessage">
          <div class="py-3 d-flex">
            <input
              type="text"
              v-model="messageText"
              class="form-control"
            /><button class="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useChatsStore } from "@/stores/chats";
import ChatMessageVue from "@/components/ChatMessage.vue";

interface Chat {
  attendant: string;
  attendant_conn_id: number;
  attendant_external_id: number;
  attendant_external_username: string;
  attendant_id: number;
  created_at: string;
  customer: string;
  customer_conn_id: number;
  customer_cpfcnpj: string;
  customer_external_id: number;
  customer_external_username: string;
  end_session: string;
  id: number;
  messages: any[];
  status: string;
  updated_at: string;
}

const props = defineProps({ chatId: String });
const store = useChatsStore();
const sockets: { [key: string]: any } = {};
const messageText = ref("");

const { selectedChat } = storeToRefs(store)!;
const route = useRoute();

function createChat() {
  if (!sockets[`${(selectedChat as unknown as Chat).id}`]) {
    const socket = new WebSocket("ws://localhost:8090");
    socket.addEventListener("open", function (event) {
      socket.send(JSON.stringify(createMessage("attendant", "opening")));
    });
    socket.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);

      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage.messageType !== "opening") {
        if (receivedMessage.messageText) {
          update();
        }
      }
    });

    sockets[`${(selectedChat as unknown as Chat).id}`] = socket;
  }
}

function createMessage(messageText: string, messageType: string) {
  const message = {
    messageType,
    messageText,
    connType: "attendant",
    sessionId: (selectedChat.value as any).id,
    customerConnId: (selectedChat.value as any).customer_conn_id,
  };
  console.log("Sending message: ", message);
  return message;
}

function update() {
  store.fetchChatMessages(+props.chatId!);
  console.log("Selected Chat: ", selectedChat.value);
  createChat();
}

onMounted(() => {
  if (selectedChat) {
    update();
  }
});

watch(
  () => route.params.chatId,
  (newChatId) => {
    update();
  }
);

watch(
  () => selectedChat,
  (newSelectedChat) => {
    if (newSelectedChat) {
      update();
    }
  }
);
function sendMessage() {
  console.log("Sending message...");
  sockets[`${(selectedChat as unknown as Chat).id}`].send(
    JSON.stringify(createMessage(messageText.value, "chat"))
  );
}
</script>
<style scoped>
.min-vh-75 {
  min-height: 75vh;
}
.chat-container {
  position: relative;
  /* background-color: #ddd; */
  border-radius: 8px;
  gap: 20px;
}

.chat-panel {
  background-color: #eee;
  border-radius: 8px;
  min-height: 50%;
  margin-top: auto;
  overflow-y: scroll;
  flex: 1;
}
.chat-form-holder {
  /* position: absolute;
  bottom: 20px; */
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
}
</style>
