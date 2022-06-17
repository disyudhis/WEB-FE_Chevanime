import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./tailwind.css";
import firebase from "./configs/firebase";

const app = createApp(App);

app.use(router);
app.config.globalProperties.$firebase = firebase;
app.mount("#app");
