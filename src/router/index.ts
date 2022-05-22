import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardViewVue from "@/views/DashboardView.vue";
import ActiveChatView from "@/views/ActiveChatView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      redirect: "/",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardViewVue,
      meta: { requiresAuth: true },
      children: [
        {
          path: "active-chat/:chatId",
          name: "active-chat",
          component: ActiveChatView,
          props: true,
        },
      ],
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
