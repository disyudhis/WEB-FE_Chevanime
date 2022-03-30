const routes = [
  {
    path: "/",
    name: "AppLayout",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "/",
        name: "TopAnime",
        component: () => import("../views/TopAnime.vue"),
      },
      {
        path: "/top-manga",
        name: "TopManga",
        component: () => import("../views/TopManga.vue"),
      },
      {
        path: "/schedule",
        name: "Schedule",
        component: () => import("../views/ScheduleAnime.vue"),
      },
      {
        path: "/forum",
        name: "Forum",
        component: () => import("../views/Forum.vue"),
      },
      {
        path: "/forum/:id",
        name: "ForumDetail",
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
