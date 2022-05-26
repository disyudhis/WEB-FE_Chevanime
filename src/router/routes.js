const routes = [
  {
    path: "/",
    name: "AppLayout",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "/",
        name: "TopAnime",
        meta: {
          requiresAuth: false,
        },
        component: () => import("../views/TopAnime.vue"),
      },
      {
        path: "/top-manga",
        name: "TopManga",
        meta: {
          requiresAuth: false,
        },
        component: () => import("../views/TopManga.vue"),
      },
      {
        path: "/schedule",
        name: "Schedule",
        meta: {
          requiresAuth: false,
        },
        component: () => import("../views/ScheduleAnime.vue"),
      },
      {
        path: "/forum",
        name: "Forum",
        meta: {
          requiresAuth: true,
        },
        component: () => import("../views/Forum.vue"),
      },
      {
        path: "/forum/:id",
        name: "ForumDetail",
        meta: {
          requiresAuth: true,
        },
        component: () => import("../views/ForumDetail.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
  },
];

export default routes;
