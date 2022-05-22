<template>
  <main class="min-vh-100">
    <div class="container">
      <h1>Sessões ativas</h1>
      <active-chats-list-vue></active-chats-list-vue>
    </div>
  </main>
</template>

<script lang="ts" setup>
import ActiveChatsListVue from "@/components/ActiveChatsList.vue";
</script>
