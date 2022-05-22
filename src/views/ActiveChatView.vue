<template>
  <div class="container">
    <h1>Atendimento nº: {{ chatId }}</h1>
    <div
      class="min-vh-75 chat-container d-flex flex-column justify-content-around"
    >
      <div class="chat-panel"></div>

      <div class="chat-form-holder p-3 mb-2">
        <form @submit.prevent="sendMessage">
          <div class="py-3 d-flex">
            <input type="text" class="form-control" /><button
              class="btn btn-primary"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({ chatId: String });

function sendMessage() {
  console.log("Sending message...");
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
