<template>
  <div class="card direct-chat direct-chat-primary">
    <div class="card-header">
      <h3 class="card-title">Atendimento nº: {{ chatId }}</h3>
      <div class="card-tools">
        <span title="3 New Messages" class="badge badge-primary">3</span>
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <button
          type="button"
          class="btn btn-tool"
          title="Contacts"
          data-widget="chat-pane-toggle"
        >
          <i class="fas fa-comments"></i>
        </button>
        <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- //card-header -->

    <div class="card-body">
      <div v-if="selectedChat" class="direct-chat-messages">
        <chat-message-vue
          class="mb-2"
          :key="message.id"
          v-for="message in (selectedChat as any).messages"
          :message="message.message"
          :sender="message.sender_type"
        ></chat-message-vue>
      </div>
    </div>
    <!-- //card-body -->
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="input-group">
          <input type="text" v-model="messageText" class="form-control" />
          <span class="input-group-append">
            <button class="btn btn-primary">Enviar</button>
          </span>
        </div>
      </form>
    </div>
    <!-- //card-footer -->
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
  const socketId = `${(selectedChat.value as unknown as Chat).id}`;
  if (!(socketId in sockets)) {
    const socket = new WebSocket("wss://hm.portalcrtelecom.com.br/chat");
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

    sockets[`${(selectedChat.value as unknown as Chat).id}`] = socket;
    console.log("Active Sockets: ", sockets);
  }
}

async function sendMessage() {
  console.log("Sending message...", selectedChat.value);
  sockets[`${(selectedChat.value as unknown as Chat).id}`].send(
    JSON.stringify(createMessage(messageText.value, "chat"))
  );
  messageText.value = "";
  //update();
  await store.fetchChatMessages(+props.chatId!);
  scrollToView();
}

function scrollToView() {
  const chatMessagesContainerel = document.querySelector(
    ".direct-chat-messages"
  )! as HTMLElement;
  chatMessagesContainerel?.lastElementChild?.scrollIntoView();
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

async function update() {
  await store.fetchChatMessages(+props.chatId!);
  console.log("Selected Chat: ", selectedChat.value);
  scrollToView();
  //createChat();
}

onMounted(async () => {
  await update();
  await createChat();
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
      createChat();
      update();
    }
  }
);
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
