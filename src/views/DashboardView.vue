<template>
  <TheNavbar></TheNavbar>
  <TheSidebar></TheSidebar>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Sessões Ativas</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container">
      <h1>Sessões ativas</h1>
      <active-chats-list-vue></active-chats-list-vue>
    </div> -->

    <DashboardContentBase>
      <RouterView></RouterView>
    </DashboardContentBase>
  </div>
</template>

<script lang="ts" setup>
//import ActiveChatsListVue from "@/components/ActiveChatsList.vue";
import TheNavbar from "../components/ui/TheNavbar.vue";
import TheSidebar from "../components/ui/TheSidebar.vue";
import DashboardContentBase from "../components/DashboardContentBase.vue";
</script>
