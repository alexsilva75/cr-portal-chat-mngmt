<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 flex-1 mt-5">
        <h1 class="text-center">Sistema de Atendimento Chat-Up!</h1>
        <div class="card">
          <div class="card-body">
            <h2 class="h5">Informe o Usuário e a Senha</h2>
            <form @submit.prevent="sendForm">
              <div class="mb-3">
                <label for="" class="form-label">Usuário</label>
                <input type="text" v-model="username" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Senha</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                />
              </div>
              <button type="submit" class="btn btn-primary">Entrar</button>
              <button type="button" @click="logout" class="btn btn-warning">
                Sair
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const username = ref("");
const password = ref("");

const store = useAuthStore();
const router = useRouter();

watch(
  () => store.isLoggedIn,
  (newValue) => {
    console.log("isLoggedIn changed...", newValue);
    if (newValue) {
      console.log("You are logged in!");
      router.replace("/dashboard/active-chats");
    }
  }
);

async function sendForm() {
  await store.auth(username.value, password.value);
}

async function logout() {
  const response = await store.logout();
  console.log("Logout Response: ", response);
}
</script>
