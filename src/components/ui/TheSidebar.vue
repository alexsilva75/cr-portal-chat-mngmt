<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <!-- <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      /> -->
      <span class="brand-text font-weight-light">Chat UP!</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="dist/img/circle-user-solid.svg"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ authUser?.name }}</a>
          <span class="text-light"
            >Não é você?
            <a class="text-danger" href="#" @click.prevent="logout"
              >Sair</a
            ></span
          >
        </div>
      </div>

      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <RouterLink class="nav-link" to="/dashboard">
              <i class="nav-icon fas fa-solid fa-house-user"></i>
              <p>Início</p>
            </RouterLink>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-solid fa-user"></i>
              <p>
                Minha Conta
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/dashboard/profile">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Perfil</p>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <RouterLink to="/dashboard/active-chats" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Atendimentos
                <span class="right badge badge-danger">New</span>
              </p>
            </RouterLink>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon far fa-envelope"></i>
              <p>
                Mensagens
                <span class="badge badge-info">
                  <!-- {{ notifications.length }}  -->
                  Nova(s)</span
                >
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <RouterLink to="/dashboard/mailbox" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Caixa de Entrada</p>
                </RouterLink>
              </li>

              <li class="nav-item">
                <a href="pages/mailbox/read-mail.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Lidas</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const { authUser } = storeToRefs(store);
// import { defineComponent, ref } from "vue";
// // import { mapGetters } from "vuex";
// export default defineComponent({
//   computed: {
//     currentRoute() {
//       return this.$route.fullPath;
//     },
//     ...mapGetters("auth", ["authUser"]),
//     ...mapGetters(["notifications"]),
//   },

//   mounted() {
//     // console.log(...this.authUser);
//     // console.log("Store in sidebar: ", this.$store);
//     console.log("Route: ", this.$route);
//     this.$store.dispatch("pullNotifications", {});
//   },
//   methods: {
//     async logout() {
//       this.$store.dispatch("auth/logout", {});
//     },
//   },
// });
</script>

<style scoped>
.main-sidebar {
  height: 100vh !important;
  overflow-y: hidden;
  z-index: 1038;
}

/* .router-link-active {
  background-color: #007bff;
  color: #fff;
  stroke: #fff;
} */

.router-link-exact-active:link,
.router-link-exact-active:visited,
.router-link-exact-active:hover,
.router-link-exact-active:active,
.router-link-exact-active:focus {
  background-color: rgba(255, 255, 255, 0.9) !important;
  color: #343a40 !important;
}
</style>
